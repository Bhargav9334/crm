import { MessageSquare, User, Send, Users, ChevronDown, X, Check, Mail, Briefcase } from 'lucide-react'
import { useEffect, useState, useRef } from 'react';
import { apiFetch } from '../utils/apiFetch';
import { API } from '../config/api';

// ─── API base ────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ROLE_CONFIG = {
  clients: {
    label: 'Client',
    icon: User,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    badge: 'bg-violet-100 text-violet-700',
    ring: 'focus:ring-violet-500',
  },
  managers: {
    label: 'Manager',
    icon: Briefcase,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    ring: 'focus:ring-blue-500',
  },
  employees: {
    label: 'Employee',
    icon: Users,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    ring: 'focus:ring-emerald-500',
  },
};

// ─── Multi-select dropdown ────────────────────────────────────────────────────
const MultiSelect = ({ options, selected, onChange, placeholder, disabled, ringClass }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (id) => {
    onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  const selectedLabels = options.filter(o => selected.includes(o.id));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3.5 bg-gray-50 text-left focus:outline-none focus:ring-2 ${ringClass} disabled:opacity-50 transition`}
      >
        <span className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          {selectedLabels.length === 0
            ? <span className="text-gray-400">{placeholder}</span>
            : selectedLabels.map(o => (
              <span key={o.id} className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2.5 py-0.5 text-sm font-medium text-gray-700">
                {o.name}
                <span
                  role="button"
                  tabIndex={0}
                  onMouseDown={e => { e.stopPropagation(); toggle(o.id); }}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <X size={12} />
                </span>
              </span>
            ))
          }
        </span>
        <ChevronDown size={16} className={`ml-2 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="max-h-52 overflow-y-auto">
            {options.length === 0
              ? <p className="text-sm text-gray-400 px-4 py-3">No recipients found</p>
              : options.map(o => (
                <label key={o.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition ${selected.includes(o.id) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                    {selected.includes(o.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                  </div>
                  <input type="checkbox" className="sr-only" checked={selected.includes(o.id)} onChange={() => toggle(o.id)} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{o.name}</p>
                    <p className="text-xs text-gray-400 truncate">{o.email}{o.role ? ` · ${o.role}` : ''}</p>
                  </div>
                </label>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Step indicator ───────────────────────────────────────────────────────────
const StepBadge = ({ n, active, done }) => (
  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all
    ${done ? 'bg-indigo-600 text-white' : active ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300' : 'bg-gray-100 text-gray-400'}`}>
    {done ? <Check size={13} strokeWidth={3} /> : n}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const Messages = () => {
  // form state
  const [role, setRole] = useState('');           // 'clients' | 'managers' | 'employees'
  const [sendMode, setSendMode] = useState('');   // 'one' | 'multiple' | 'all'
  const [recipients, setRecipients] = useState([]); // fetched list
  const [selectedIds, setSelectedIds] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // ui state
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // fetch recipients when role changes
  useEffect(() => {
    if (!role) { setRecipients([]); setSelectedIds([]); return; }
    const fetchRecipients = async () => {
      setLoading(true);
      setSelectedIds([]);
      try {
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3ODA5OTEzNDMsImV4cCI6MTc4MTA3Nzc0M30.HOeK1IqR_J7GMTmegUmdlRmUAaZDNRXF5G65eyyGHo0';

const res = await fetch(
  `${BASE_URL}/api/messages/recipients/${role}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
        const data = await res.json();
        setRecipients(Array.isArray(data) ? data : []);
      } catch {
        setRecipients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipients();
  }, [role]);

  // reset recipients selection when mode changes
  useEffect(() => { setSelectedIds([]); }, [sendMode]);

  const cfg = role ? ROLE_CONFIG[role] : null;

  // derived: who actually gets the mail
  const recipientIds = sendMode === 'all' ? recipients.map(r => r.id) : selectedIds;

  const canSend =
    role &&
    sendMode &&
    subject.trim() &&
    message.trim() &&
    (sendMode === 'all' ? recipients.length > 0 : selectedIds.length > 0);

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${BASE_URL}/api/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          recipientIds,
          sendToAll: sendMode === 'all',
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Something went wrong');
      setSuccess(data.message || `Message sent to ${recipientIds.length} recipient(s)`);
      setSubject('');
      setMessage('');
      setSelectedIds([]);
      setSendMode('');
      setRole('');
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  // step completion
  const step1Done = !!role;
  const step2Done = !!sendMode && (sendMode === 'all' ? recipients.length > 0 : selectedIds.length > 0);
  const step3Done = subject.trim().length > 0 && message.trim().length > 0;

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow">
            <Mail size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Messages</h1>
            <p className="text-gray-500 text-sm">Communicate with your team and clients directly</p>
          </div>
        </div>
      </section>

      {/* ── Composer card ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Card header */}
          <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Compose Message</h2>
            <p className="text-sm text-gray-500 mt-0.5">Choose recipients, write your message, and send</p>
          </div>

          <div className="px-6 sm:px-8 py-7 space-y-8">

            {/* ── STEP 1 : Role ── */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <StepBadge n={1} active={!step1Done} done={step1Done} />
                <span className="text-sm font-semibold text-gray-700">Select recipient type</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(ROLE_CONFIG).map(([key, c]) => {
                  const Icon = c.icon;
                  const active = role === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => { setRole(key); setSendMode(''); }}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all
                        ${active
                          ? `border-transparent bg-gradient-to-r ${c.color} text-white shadow-md`
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-white/20' : c.bg}`}>
                        <Icon size={16} className={active ? 'text-white' : 'text-gray-600'} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{c.label}s</p>
                        {loading && role === key && (
                          <p className="text-xs opacity-70">Loading…</p>
                        )}
                        {!loading && role === key && (
                          <p className="text-xs opacity-80">{recipients.length} found</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── STEP 2 : Send mode + recipient picker ── */}
            {role && (
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <StepBadge n={2} active={!step2Done} done={step2Done} />
                  <span className="text-sm font-semibold text-gray-700">Choose recipients</span>
                </div>

                {/* mode buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { key: 'one', label: 'One recipient' },
                    { key: 'multiple', label: 'Multiple recipients' },
                    { key: 'all', label: `All ${cfg.label}s (${recipients.length})` },
                  ].map(m => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setSendMode(m.key)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
                        ${sendMode === m.key
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* recipient selector */}
                {sendMode === 'one' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Recipient</label>
                    <select
                      value={selectedIds[0] || ''}
                      onChange={e => setSelectedIds(e.target.value ? [e.target.value] : [])}
                      disabled={loading}
                      className={`w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 ${cfg.ring} disabled:opacity-50`}
                    >
                      <option value="">
                        {loading ? 'Loading…' : `Choose a ${cfg.label.toLowerCase()}…`}
                      </option>
                      {recipients.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name} — {r.email}{r.role ? ` (${r.role})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {sendMode === 'multiple' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Recipients</label>
                    <MultiSelect
                      options={recipients}
                      selected={selectedIds}
                      onChange={setSelectedIds}
                      placeholder={loading ? 'Loading…' : `Select ${cfg.label.toLowerCase()}s…`}
                      disabled={loading}
                      ringClass={cfg.ring}
                    />
                  </div>
                )}

                {sendMode === 'all' && (
                  <div className={`${cfg.bg} ${cfg.border} border rounded-xl px-4 py-3 flex items-center gap-3`}>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cfg.color} flex items-center justify-center shrink-0`}>
                      <Users size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Sending to all {recipients.length} {cfg.label.toLowerCase()}s
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {recipients.map(r => r.name).slice(0, 3).join(', ')}{recipients.length > 3 ? ` and ${recipients.length - 3} more` : ''}
                      </p>
                    </div>
                  </div>
                )}

                {/* selected recipients preview (one / multiple) */}
                {(sendMode === 'one' || sendMode === 'multiple') && selectedIds.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {recipients.filter(r => selectedIds.includes(r.id)).map(r => (
                      <span key={r.id} className={`inline-flex items-center gap-1.5 ${cfg.badge} text-xs font-medium px-2.5 py-1 rounded-full`}>
                        {r.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── STEP 3 : Compose ── */}
            {role && sendMode && (
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <StepBadge n={3} active={!step3Done} done={step3Done} />
                  <span className="text-sm font-semibold text-gray-700">Write your message</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="e.g. Project Update — Q3 Review"
                      className={`w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${cfg.ring} transition`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Message</label>
                    <textarea
                      rows={7}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Write your message here…"
                      className={`w-full border border-gray-300 rounded-xl px-4 py-3.5 resize-none bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${cfg.ring} transition`}
                    />
                    <p className="text-right text-xs text-gray-400 mt-1">{message.length} chars</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Feedback ── */}
            {success && (
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
                <p className="text-sm font-medium text-emerald-800">{success}</p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <X size={16} className="text-red-500 shrink-0" />
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {/* ── Send button ── */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend || sending}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-200
                ${canSend && !sending
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              {sending
                ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>)
                : (<><Send size={16} />Send Message {canSend && recipientIds.length > 0 ? `· ${recipientIds.length} recipient${recipientIds.length !== 1 ? 's' : ''}` : ''}</>)
              }
            </button>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Messages;
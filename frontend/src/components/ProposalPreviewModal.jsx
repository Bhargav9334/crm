import { X, Download, Send } from "lucide-react";
import html2pdf from "html2pdf.js";

const ProposalPreviewModal = ({ proposal, onClose }) => {
  if (!proposal) return null;

  const downloadPdf = () => {
    const element = document.getElementById("proposal-pdf");
    if (!element) return;

    html2pdf().set({
      margin: 10,
      filename: `${proposal.proposalTitle || "proposal"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }).from(element).save();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl rounded-xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {proposal.proposalTitle || "Proposal"}
          </h2>

          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div id="proposal-pdf" className="px-6 py-6 space-y-6">
          <InfoGrid proposal={proposal} />
          <Section title="Description" value={proposal.description} />
          <Section title="Deliverables" value={proposal.deliverables} />

          <div className="grid grid-cols-2 gap-6">
            <Section
              title="Timeline"
              value={proposal.timeline ? `${proposal.timeline} weeks` : "—"}
            />
            <Section
              title="Payment Terms"
              value={proposal.paymentterms || proposal.paymentTerms}
            />
          </div>

          <Section title="Terms & Conditions" value={proposal.condition} />
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={downloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            <Download size={16} />
            Download PDF
          </button>

          <button
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-purple-500 text-white opacity-80 cursor-not-allowed"
          >
            <Send size={16} />
            Already Sent
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoGrid = ({ proposal }) => (
  <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
    <Info label="Client" value={proposal.clientName} />
    <Info
      label="Amount"
      value={`${proposal.currency} ${proposal.amount}`}
      highlight
    />
    <Info label="Status" value={proposal.status || "Draft"} badge />
    <Info label="Valid Until" value={proposal.validUntil || proposal.date} />
  </div>
);

const Info = ({ label, value, highlight, badge }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    {badge ? (
      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-gray-200">
        {value || "—"}
      </span>
    ) : (
      <p className={`font-medium ${highlight ? "text-green-600 text-lg" : ""}`}>
        {value || "—"}
      </p>
    )}
  </div>
);

const Section = ({ title, value }) => (
  <div>
    <h3 className="text-sm font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-700 whitespace-pre-line">
      {value || "—"}
    </p>
  </div>
);

export default ProposalPreviewModal;

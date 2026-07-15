import type { ReactNode } from "react";

import styles from "./styles.module.css";

export interface PublicDocumentMetadata {
  status: "review-candidate" | "maintained" | "experimental" | "deprecated";
  approval_status: "pending" | "approved";
  version: string;
  classification: "PUBLIC";
  owner: string;
  approver?: string;
  audience: string[];
  last_reviewed: string;
  review_cadence: "quarterly" | "semiannual" | "annual";
}

const cadenceMonths = { quarterly: 3, semiannual: 6, annual: 12 } as const;

const labels = {
  "review-candidate": "Review candidate",
  maintained: "Maintained",
  experimental: "Experimental",
  deprecated: "Deprecated",
  pending: "Pending",
  approved: "Approved",
  quarterly: "Quarterly",
  semiannual: "Semiannual",
  annual: "Annual",
} as const;

function nextReviewDate(
  lastReviewed: string,
  cadence: keyof typeof cadenceMonths,
) {
  const date = new Date(`${lastReviewed}T00:00:00.000Z`);
  date.setUTCMonth(date.getUTCMonth() + cadenceMonths[cadence]);
  return date.toISOString().slice(0, 10);
}

interface MetadataItemProps {
  label: string;
  children: ReactNode;
}

function MetadataItem({ label, children }: MetadataItemProps): ReactNode {
  return (
    <div className={styles.item}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

interface DocumentMetadataPanelProps {
  document: PublicDocumentMetadata;
}

export default function DocumentMetadataPanel({
  document,
}: DocumentMetadataPanelProps): ReactNode {
  const nextReview = nextReviewDate(
    document.last_reviewed,
    document.review_cadence,
  );

  return (
    <section
      className={styles.panel}
      aria-label="Document metadata"
      data-pagefind-ignore="all"
    >
      <p className={styles.heading}>Document metadata</p>
      <dl className={styles.grid}>
        <MetadataItem label="Status">
          <span className={styles.badge}>{labels[document.status]}</span>
        </MetadataItem>
        <MetadataItem label="Approval">
          <span className={styles.badge}>
            {labels[document.approval_status]}
          </span>
        </MetadataItem>
        <MetadataItem label="Version">{document.version}</MetadataItem>
        <MetadataItem label="Classification">
          {document.classification}
        </MetadataItem>
        <MetadataItem label="Owner">{document.owner}</MetadataItem>
        {document.approver && (
          <MetadataItem label="Approver">{document.approver}</MetadataItem>
        )}
        <MetadataItem label="Audience">
          {document.audience.join(", ")}
        </MetadataItem>
        <MetadataItem label="Last reviewed">
          <time dateTime={document.last_reviewed}>
            {document.last_reviewed}
          </time>
        </MetadataItem>
        <MetadataItem label="Next review">
          <time dateTime={nextReview}>{nextReview}</time>{" "}
          <span className={styles.cadence}>
            ({labels[document.review_cadence]})
          </span>
        </MetadataItem>
      </dl>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Building2, Search } from "lucide-react";

const companies = [
  "Amazon",
  "Google",
  "Microsoft",
  "Meta",
  "Apple",
  "Netflix",
  "Adobe",
  "Uber",
  "Atlassian",
  "LinkedIn",
  "Oracle",
  "Salesforce",
  "PayPal",
  "Visa",
  "Mastercard",
  "JPMorgan Chase",
  "Goldman Sachs",
  "Morgan Stanley",
  "Walmart",
  "Target",
  "Flipkart",
  "Swiggy",
  "Zomato",
  "PhonePe",
  "Paytm",
  "Razorpay",
  "CRED",
  "Meesho",
  "Myntra",
  "Zepto",
  "Deloitte",
  "Accenture",
  "Infosys",
  "TCS",
  "Wipro",
  "Cognizant",
  "Capgemini",
  "HCLTech",
  "Tech Mahindra",
  "Persistent Systems",
  "Cisco",
  "Intel",
  "NVIDIA",
  "AMD",
  "Qualcomm",
  "Samsung",
  "Siemens",
  "Texas Instruments",
  "VMware",
  "Dell",
  "Booking.com",
  "Airbnb",
  "Spotify",
  "Snap",
  "Pinterest",
  "Dropbox",
  "GitHub",
  "GitLab",
  "Reddit",
  "Zoho",
  "Freshworks",
  "ServiceNow",
  "Intuit",
  "Bloomberg",
  "Two Sigma",
  "Coinbase",
  "Datadog",
  "Stripe",
  "Block",
  "Twilio",
  "PayU",
  "Groww",
  "Dream11",
  "Ola",
  "Juspay",
];

export default function Companies() {
  const [search, setSearch] = useState("");

  const filteredCompanies = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return companies;

    return companies.filter((company) => company.toLowerCase().includes(value));
  }, [search]);

  return (
    <div className="page">
      <div className="eyebrow">COMPANY PREP</div>

      <h1>Practice by company</h1>

      <p className="pageDescription">
        Search your target company and practice company-specific interview
        problems.
      </p>

      {/* SEARCH */}
      <div
        style={{
          position: "relative",
          maxWidth: "650px",
          marginTop: "28px",
          marginBottom: "32px",
        }}
      >
        <Search
          size={18}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.55,
          }}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company... Amazon, Google, Microsoft..."
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "15px 18px 15px 46px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            color: "inherit",
            outline: "none",
            fontSize: "14px",
          }}
        />
      </div>

      <div className="problemListHeader">
        <span>{filteredCompanies.length} COMPANIES</span>
        <span>COMPANY INTERVIEW PREP</span>
      </div>

      {filteredCompanies.length > 0 ? (
        <div className="grid">
          {filteredCompanies.map((company) => {
            const slug = company
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");

            return (
              <Link
                key={company}
                href={`/companies/${slug}`}
                className="card"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <Building2 size={19} />
                  </div>

                  <ArrowUpRight size={18} style={{ opacity: 0.5 }} />
                </div>

                <h3>{company}</h3>

                <p>Company interview problems and coding preparation.</p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "7px",
                    marginTop: "18px",
                  }}
                >
                  <span className="badge">30 Days</span>
                  <span className="badge">3 Months</span>
                  <span className="badge">6 Months</span>
                  <span className="badge">1 Year</span>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    fontSize: "13px",
                    opacity: 0.7,
                  }}
                >
                  Open company prep →
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="emptyState">
          <h3>No company found</h3>
          <p>Try another company name.</p>
        </div>
      )}
    </div>
  );
}

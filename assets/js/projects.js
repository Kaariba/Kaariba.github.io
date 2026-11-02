/* =========================================================
   SITE SETTINGS + CASE STUDY CONTENT
   This is the only file you need to edit to update links
   and case studies. Text in [square brackets] is placeholder
   copy: replace it before going live.
   ========================================================= */

window.SITE = {
  // Google Drive link to the résumé. Best: a direct link to the PDF file
  // (Share > Anyone with the link > Viewer > Copy link), not the folder.
  resumeUrl: "https://drive.google.com/drive/folders/REPLACE_WITH_FOLDER_OR_FILE_ID"
};

/*
  HOW TO ADD A CASE STUDY
  1. Copy one object below and change the "id" (lowercase-with-dashes).
  2. Create a folder assets/projects/<id>/ and drop in images named:
       thumb.png      card image          (1600 x 1000, 16:10)
       approach.png   slide 2 diagram     (1600 x 900, 16:9)
       dashboard.png  slide 3 dashboard   (1600 x 900, 16:9)
     Any image that is missing shows a neat placeholder instead.
  3. "type":
       "full"  -> four slides: Problem, Approach, Analysis, Recommendation
       "nda"   -> one-screen summary, no visuals (for client work)
  4. "status": "published" or "in-progress" (shows an amber label and a dashed card).
  5. Link directly to a case study with  yoursite/#case/<id>
*/

window.PROJECTS = [
  {
    id: "profitability-simulator",
    type: "full",
    status: "published",
    kicker: "MSc major project · 2026",
    title: "Profitability Simulator & Margin Optimisation",
    summary: "Decision-support model testing pricing strategies and demand scenarios against profit outcomes.",
    outcome: "[Headline result, e.g. the pricing scenario that lifts margin by x pts]",
    tools: ["Excel", "Power BI", "Scenario modelling"],
    deckUrl: "", // optional link to the full PDF deck (Google Drive). Leave "" to hide.

    slides: {
      problem: {
        question: "[One-sentence business question, e.g. “Which pricing strategy protects margin if demand drops 15%?”]",
        context: "[Company or sector, and the situation today]",
        stakeholders: "[Who needs the answer, and why]",
        constraints: "[Data, time and scope limits]",
        stakeLabel: "What's at stake",
        stakeValue: "[€x / x%]",
        stakeNote: "[Cost of the problem or size of the opportunity]"
      },
      approach: {
        headline: "[How I framed the problem, and why this method]",
        steps: ["[Define the question]", "[Collect & clean data]", "[Build the scenario model]", "[Validate with stakeholders]"],
        imageAlt: "Model structure and data flow",
        imageLabel: "[Process map, data model or method diagram]",
        dataSources: "[Dataset, number of rows, time period]",
        assumptions: "[Two or three key assumptions]",
        toolsUsed: "[Excel · Power BI · SQL]"
      },
      analysis: {
        imageAlt: "Scenario dashboard comparing price, demand and margin",
        imageLabel: "[Dashboard screenshot]",
        liveUrl: "", // optional: published Power BI / Tableau Public link
        findings: [
          { title: "[Finding 1, with the number]", detail: "[So what for the business]" },
          { title: "[Finding 2, with the number]", detail: "[So what for the business]" },
          { title: "[Finding 3, with the number]", detail: "[So what for the business]" }
        ]
      },
      recommendation: {
        headline: "[The one-line answer to the business question]",
        rows: [
          { action: "[Action 1]", impact: "[+x% margin]", effort: "[Low]", owner: "[Team]" },
          { action: "[Action 2]", impact: "[Impact]", effort: "[Medium]", owner: "[Team]" },
          { action: "[Action 3]", impact: "[Impact]", effort: "[High]", owner: "[Team]" }
        ],
        risks: "[What to monitor, and what I would test next]"
      }
    }
  },

  {
    id: "new-project",
    type: "full",
    status: "in-progress",
    kicker: "Independent project",
    title: "[New project title]",
    summary: "[One-line business problem: who is affected and what it costs today.]",
    outcome: "[Quantified recommendation]",
    tools: ["[Tool]", "[Method]"],
    deckUrl: "",
    slides: {
      problem: {
        question: "[The business question]",
        context: "[Context]",
        stakeholders: "[Stakeholders]",
        constraints: "[Constraints]",
        stakeLabel: "What's at stake",
        stakeValue: "[€x / x%]",
        stakeNote: "[Why it matters]"
      },
      approach: {
        headline: "[Approach headline]",
        steps: ["[Step 1]", "[Step 2]", "[Step 3]", "[Step 4]"],
        imageAlt: "Current-state and future-state process map",
        imageLabel: "[As-is / to-be process map]",
        dataSources: "[Data sources]",
        assumptions: "[Assumptions]",
        toolsUsed: "[Tools]"
      },
      analysis: {
        imageAlt: "Analysis dashboard",
        imageLabel: "[Dashboard screenshot]",
        liveUrl: "",
        findings: [
          { title: "[Finding 1]", detail: "[So what]" },
          { title: "[Finding 2]", detail: "[So what]" },
          { title: "[Finding 3]", detail: "[So what]" }
        ]
      },
      recommendation: {
        headline: "[Recommendation headline]",
        rows: [
          { action: "[Action 1]", impact: "[Impact]", effort: "[Effort]", owner: "[Owner]" },
          { action: "[Action 2]", impact: "[Impact]", effort: "[Effort]", owner: "[Owner]" },
          { action: "[Action 3]", impact: "[Impact]", effort: "[Effort]", owner: "[Owner]" }
        ],
        risks: "[Risks and next steps]"
      }
    }
  },

  {
    id: "service-request-dashboard",
    type: "nda",
    status: "published",
    kicker: "EY internal · 2023",
    title: "Service Request Monitoring & Analytics Dashboard",
    summary: "Power BI dashboard on SharePoint tracking KPIs, SLA performance and service-request volumes.",
    outcome: "2+ hours of manual reporting removed each week",
    tools: ["Power BI", "SharePoint", "ServiceNow"],
    nda: {
      problem: "Service-request KPIs and SLA performance were compiled by hand each week, so the team saw problems late. [Add one more line of context.]",
      did: "Defined the KPIs with stakeholders, connected SharePoint data to Power BI, and designed views for SLA performance, request volumes and operational metrics.",
      outcomeValue: "2+ hrs/week",
      outcomeText: "of manual reporting removed, with live SLA visibility for the team."
    }
  }
];

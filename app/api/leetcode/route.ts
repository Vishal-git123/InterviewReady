import { NextResponse } from "next/server";

const QUERY = `
query problemsetQuestionListV2(
  $filters: QuestionFilterInput
  $limit: Int
  $searchKeyword: String
  $skip: Int
  $sortBy: QuestionSortByInput
  $categorySlug: String
) {
  problemsetQuestionListV2(
    filters: $filters
    limit: $limit
    searchKeyword: $searchKeyword
    skip: $skip
    sortBy: $sortBy
    categorySlug: $categorySlug
  ) {
    questions {
      id
      titleSlug
      title
      questionFrontendId
      paidOnly
      difficulty
      topicTags {
        name
        slug
      }
      status
      acRate
    }
    totalLength
    hasMore
  }
}
`;

const filters = {
  filterCombineType: "ALL",

  statusFilter: {
    questionStatuses: [],
    operator: "IS",
  },

  difficultyFilter: {
    difficulties: [],
    operator: "IS",
  },

  languageFilter: {
    languageSlugs: [],
    operator: "IS",
  },

  topicFilter: {
    topicSlugs: [],
    operator: "IS",
  },

  acceptanceFilter: {},
  frequencyFilter: {},
  frontendIdFilter: {},
  lastSubmittedFilter: {},
  publishedFilter: {},

  companyFilter: {
    companySlugs: [],
    operator: "IS",
  },

  premiumFilter: {
    premiumStatus: [],
    operator: "IS",
  },
};

export async function GET() {
  try {
    const allQuestions: any[] = [];

    let skip = 0;
    const limit = 100;

    while (true) {
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "User-Agent": "InterviewReady/3.0",
          Accept: "application/json",
        },

        body: JSON.stringify({
          operationName: "problemsetQuestionListV2",

          query: QUERY,

          variables: {
            filters,
            limit,
            skip,
            searchKeyword: "",
            categorySlug: "all-code-essentials",

            sortBy: {
              sortField: "CUSTOM",
              sortOrder: "ASCENDING",
            },
          },
        }),

        cache: "no-store",
      });

      const text = await response.text();

      console.log("LeetCode HTTP:", response.status);

      if (!response.ok) {
        console.log("LeetCode response:", text);

        throw new Error(
          `LeetCode returned HTTP ${response.status}: ${text.slice(0, 300)}`,
        );
      }

      const data = JSON.parse(text);

      if (data.errors) {
        console.log("LeetCode GraphQL errors:", data.errors);

        throw new Error(data.errors?.[0]?.message || "LeetCode GraphQL error");
      }

      const result = data?.data?.problemsetQuestionListV2;

      if (!result) {
        throw new Error("Invalid LeetCode response");
      }

      const questions = result.questions || [];

      allQuestions.push(...questions);

      console.log(
        `Fetched ${allQuestions.length} / ${result.totalLength || "?"}`,
      );

      if (!result.hasMore || questions.length === 0) {
        break;
      }

      skip += limit;

      // Don't hammer LeetCode
      await new Promise((resolve) => setTimeout(resolve, 250));

      // Safety limit
      if (skip >= 5000) {
        break;
      }
    }

    return NextResponse.json({
      success: true,
      questions: allQuestions,
      count: allQuestions.length,
    });
  } catch (error: any) {
    console.error("LEETCODE API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        questions: [],
        error: error?.message || "LeetCode catalog unavailable",
      },
      { status: 502 },
    );
  }
}

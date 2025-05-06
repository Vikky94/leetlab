import { db } from "../db/index.js"
import {
    getJudge0LanguageId,
    pollBatchResults,
    submitBatch,
} from "../utils/judge0.js";
import { asyncHandler } from "../utils/async-handler.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"

export const createProblem = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
    } = req.body;
    const isProblemExist = await db.problem.findUnique({ where : {"title" : title} });
    if(isProblemExist ) throw new ApiError(409, "Problem already exist with this name") 

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
        const languageId = getJudge0LanguageId(language);
        if (!languageId) throw new ApiError(400, { error: `Language ${language} is not supported` });

        const submissions = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output,
        }));
        const submissionResults = await submitBatch(submissions);
        const tokens = submissionResults.map((res) => res.token);
        const results = await pollBatchResults(tokens);
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            console.log("Result-----", result);
            if (result.status.id !== 3) throw new ApiError(400, { error: `Testcase ${i + 1} failed for language ${language}` })
        }
    }
    const newProblem = await db.problem.create({
        data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippets,
            referenceSolutions,
            userId: req.user.id,
        },
    });
    return res.status(201).json(new ApiResponse(201, { problem: newProblem }, "Message Created Successfully"));
});

export const getAllProblems = asyncHandler(async (req, res) => {
    const problems = await db.problem.findMany();
    if (!problems) throw new ApiError(404, "No problems Found");
    res.status(200).json(new ApiResponse(200, { problems }, "Problems Fetched Successfully"));
});

export const getProblemById = async (req, res) => {
    const { id } = req.params;
    const problem = await db.problem.findUnique({
        where: {
            id,
        },
    });
    if (!problem) throw new ApiError(404, "Problem not found.");
    return res.status(200).json({
        sucess: true,
        message: "Message Created Successfully",
        problem,
    });
};

// TODO: IMPLEMENT BY YOUR SELF🔥
export const updateProblem = async (req, res) => {
    // id
    // id--->problem ( condition)
    // baaki kaam same as create
};

export const deleteProblem = async (req, res) => {
    const { id } = req.params;
    const problem = await db.problem.findUnique({ where: { id } });
    if (!problem) {
        return res.status(404).json({ error: "Problem Not found" });
    }
    await db.problem.delete({ where: { id } });
    res.status(200).json({
        success: true,
        message: "Problem deleted Successfully",
    });
};

export const getAllProblemsSolvedByUser = async (req, res) => { };
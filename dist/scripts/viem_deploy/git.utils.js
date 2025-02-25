"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGithubStepSummary = exports.setGithubActionEnv = exports.getPublishedPackages = exports.getGithubTagRef = void 0;
const utils_1 = require("../utils");
// Get the GITHUB_REF environment variable
function getGithubTagRef() {
    // Get the GITHUB_REF environment variable
    const githubRef = process.env.GITHUB_REF;
    if (!githubRef) {
        console.error('GITHUB_REF environment variable is not set.');
        throw new Error('GITHUB_REF environment variable is not set.');
    }
    // Check if GITHUB_REF is a tag
    const tagPrefix = 'refs/tags/';
    if (!githubRef.startsWith(tagPrefix)) {
        console.error('GITHUB_REF is not a tag.');
        throw new Error('GITHUB_REF is not a tag.');
    }
    // Extract the tag name
    return githubRef.substring(tagPrefix.length);
}
exports.getGithubTagRef = getGithubTagRef;
/**
 * Gets the published package metadata as json from the npm registry
 * @param packageName the name of the package
 * @returns
 */
async function getPublishedPackages(packageName) {
    return await (0, utils_1.execCMD)(`npm show ${packageName} --json`);
}
exports.getPublishedPackages = getPublishedPackages;
/**
 * Sets the environment variable in the Github Action
 *
 * @param envKey the environment variable key
 * @param envVal the environment variable value
 */
function setGithubActionEnv(envKey, envVal) {
    (0, utils_1.execCMD)(`echo "${envKey}=${envVal}" >> $GITHUB_ENV`);
}
exports.setGithubActionEnv = setGithubActionEnv;
/**
 * Sets the summary markdown in the Github Action step
 * @param summaryMarkdown the markdown summary to be set
 */
function setGithubStepSummary(summaryMarkdown) {
    (0, utils_1.execCMD)(`echo "${summaryMarkdown}" >> $GITHUB_STEP_SUMMARY`);
}
exports.setGithubStepSummary = setGithubStepSummary;

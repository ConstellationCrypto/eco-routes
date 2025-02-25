export declare function getGithubTagRef(): string;
/**
 * Gets the published package metadata as json from the npm registry
 * @param packageName the name of the package
 * @returns
 */
export declare function getPublishedPackages(packageName: string): Promise<string>;
/**
 * Sets the environment variable in the Github Action
 *
 * @param envKey the environment variable key
 * @param envVal the environment variable value
 */
export declare function setGithubActionEnv(envKey: string, envVal: string): void;
/**
 * Sets the summary markdown in the Github Action step
 * @param summaryMarkdown the markdown summary to be set
 */
export declare function setGithubStepSummary(summaryMarkdown: string): void;

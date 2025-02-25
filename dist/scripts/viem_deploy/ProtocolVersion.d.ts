import semver from 'semver-utils';
import { Chain } from 'viem';
import { SaltsType } from '../deploy/addresses';
export type PublishTag = 'beta' | 'latest' | 'rc';
/**
 * Given a version number MAJOR.MINOR.PATCH, increment the:
 *
 * 1. MAJOR version when you make incompatible API changes
 * 2. MINOR version when you add functionality in a backward compatible manner
 * 3. PATCH version when you make backward compatible bug fixes. This inlcudes
 * partial releases where we add chain support with no new features
 *
 * Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.
 */
export declare class ProtocolVersion {
    version: semver.SemVer;
    packageName: string;
    constructor(version?: string);
    getDeployChains(): Promise<{
        chains: Chain[];
        salts?: SaltsType;
    }>;
    /**
     *
     * @returns the chains that have been deployed
     */
    getNewChains(): Promise<Chain[]>;
    /**
     * Verify that the version is a valid SemVer
     */
    verifySemver(version: string): string;
    getVersion(): string;
    /**
     * Updates the version of the project in the solidity files and the package.json file
     */
    updateProjectVersion(): void;
    /**
     * This function updates all the .sol files in the given directory to return a version string with the given version.
     * Its assumed that the files already have the function signature `function version() external pure returns (string memory)`
     *
     * @param dir the directory to update the version in the solidity files, default is the contracts directory
     * @param version the version to update the solidity files to, default is the current version
     */
    updateVersionInSolidityFiles(dir?: string, version?: string): void;
    /**
     * Updates the package json version to the given version
     *
     */
    updatePackageJsonVersion(): void;
    /**
     * Checks the current published version of this package on npm and returns true if the current version is a patch update from the published version.
     * Patch update would be the third number in the semver string 0.0.x.
     * If no published version is found for the npm build tag, it returns false.
     *
     * @returns true if the current version is a patch update from the published version
     */
    isPatchUpdate(): Promise<boolean>;
    /**
     * Parses the version tag to release for the tag type
     * @returns 'beta' | 'rc' | 'latest', throws otherwise
     */
    getReleaseTag(): PublishTag;
    /**
     * Gets the published dist-tag for the package on npm. If the tag is left
     * empty, it defaults to the release tag of the @link{this.version.release}
     * @param tag the npm build tag
     * @returns
     */
    getPublishedVersion(tag: PublishTag): Promise<string | undefined>;
}

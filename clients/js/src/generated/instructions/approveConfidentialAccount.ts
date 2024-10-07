/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const APPROVE_CONFIDENTIAL_ACCOUNT_DISCRIMINATOR = 27;

export function getApproveConfidentialAccountDiscriminatorBytes() {
  return getU8Encoder().encode(APPROVE_CONFIDENTIAL_ACCOUNT_DISCRIMINATOR);
}

export const APPROVE_CONFIDENTIAL_ACCOUNT_CONFIDENTIAL_TRANSFER_DISCRIMINATOR = 3;

export function getApproveConfidentialAccountConfidentialTransferDiscriminatorBytes() {
  return getU8Encoder().encode(
    APPROVE_CONFIDENTIAL_ACCOUNT_CONFIDENTIAL_TRANSFER_DISCRIMINATOR
  );
}

export type ApproveConfidentialAccountInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountToken extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountToken extends string
        ? WritableAccount<TAccountToken>
        : TAccountToken,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      ...TRemainingAccounts,
    ]
  >;

export type ApproveConfidentialAccountInstructionData = {
  discriminator: number;
  confidentialTransferDiscriminator: number;
};

export type ApproveConfidentialAccountInstructionDataArgs = {};

export function getApproveConfidentialAccountInstructionDataEncoder(): Encoder<ApproveConfidentialAccountInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['confidentialTransferDiscriminator', getU8Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: APPROVE_CONFIDENTIAL_ACCOUNT_DISCRIMINATOR,
      confidentialTransferDiscriminator:
        APPROVE_CONFIDENTIAL_ACCOUNT_CONFIDENTIAL_TRANSFER_DISCRIMINATOR,
    })
  );
}

export function getApproveConfidentialAccountInstructionDataDecoder(): Decoder<ApproveConfidentialAccountInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['confidentialTransferDiscriminator', getU8Decoder()],
  ]);
}

export function getApproveConfidentialAccountInstructionDataCodec(): Codec<
  ApproveConfidentialAccountInstructionDataArgs,
  ApproveConfidentialAccountInstructionData
> {
  return combineCodec(
    getApproveConfidentialAccountInstructionDataEncoder(),
    getApproveConfidentialAccountInstructionDataDecoder()
  );
}

export type ApproveConfidentialAccountInput<
  TAccountToken extends string = string,
  TAccountMint extends string = string,
  TAccountAuthority extends string = string,
> = {
  /** The SPL Token account to approve. */
  token: Address<TAccountToken>;
  /** The corresponding SPL Token mint. */
  mint: Address<TAccountMint>;
  /** Confidential transfer mint authority. */
  authority: TransactionSigner<TAccountAuthority>;
};

export function getApproveConfidentialAccountInstruction<
  TAccountToken extends string,
  TAccountMint extends string,
  TAccountAuthority extends string,
>(
  input: ApproveConfidentialAccountInput<
    TAccountToken,
    TAccountMint,
    TAccountAuthority
  >
): ApproveConfidentialAccountInstruction<
  typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountToken,
  TAccountMint,
  TAccountAuthority
> {
  // Program address.
  const programAddress = TOKEN_2022_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    token: { value: input.token ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: false },
    authority: { value: input.authority ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.token),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.authority),
    ],
    programAddress,
    data: getApproveConfidentialAccountInstructionDataEncoder().encode({}),
  } as ApproveConfidentialAccountInstruction<
    typeof TOKEN_2022_PROGRAM_ADDRESS,
    TAccountToken,
    TAccountMint,
    TAccountAuthority
  >;

  return instruction;
}

export type ParsedApproveConfidentialAccountInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The SPL Token account to approve. */
    token: TAccountMetas[0];
    /** The corresponding SPL Token mint. */
    mint: TAccountMetas[1];
    /** Confidential transfer mint authority. */
    authority: TAccountMetas[2];
  };
  data: ApproveConfidentialAccountInstructionData;
};

export function parseApproveConfidentialAccountInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedApproveConfidentialAccountInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      token: getNextAccount(),
      mint: getNextAccount(),
      authority: getNextAccount(),
    },
    data: getApproveConfidentialAccountInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
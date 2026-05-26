type StringUUID = string & {};
type StringTimestamp = string & {};
type StringUserHandle = string & {};
type StringUserInitials = string & {};
type StringEmoji = string & {};

type SuccessResponse = { success: true };

export type {
  StringTimestamp,
  StringUUID,
  StringUserHandle,
  StringEmoji,
  StringUserInitials,
  SuccessResponse,
};

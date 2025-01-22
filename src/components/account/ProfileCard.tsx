import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Stack, Box } from "@mui/material";

import CompleteButton from "./CompleteButton";
// import UserAvatar from "../store/UserAvatar";
// import Avatar from "../home/Avatar";

import { getAccount, setAccount } from "../../store/AccountSlice";
import { setLogin } from "../../store/LoginSlice";

import { getKeccak256Hash } from "../../lib/helper/EncryptHelper";

import { IAccount } from "../../types/AccountTypes";

export interface IPropsProfileCard {
  account: IAccount;
}

const ProfileCard = ({ account }: IPropsProfileCard) => {
  const dispatch = useDispatch();

  const accountStore: IAccount = useSelector(getAccount);

  const isGuest: boolean = useMemo(
    () =>
      account?.nickName === "Guest" &&
      account?.password === getKeccak256Hash(""),
    [account]
  );

  const handleClick = useCallback(() => {
    dispatch(setAccount(account));
    if (account?.uid !== accountStore?.uid) {
      dispatch(setLogin(false));
    }
  }, [accountStore]);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          textTransform: "none",
          width: "100%",
          border: "1px solid #FFFFFF1A",
          padding: "12px 8px 6px",
          borderRadius: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          background: "#8080801A",
          textAlign: "left",
          "&:hover": {
            background: "#8080804D",
            border: "1px solid #7C7C7C",
          },
        }}
      >
        <Stack gap={"8px"} width={"100%"}>
          <Stack direction="row" alignItems="center" gap="12px" width={"100%"}>
            {/* <Avatar url={account?.avatar} size={64} /> */}
            {/* <UserAvatar userId={account?.uid} size={64} /> */}
            <Stack>
              <Box className={"fs-16-regular white"}>{account?.nickName}</Box>
              <Box className={"fs-14-regular light"}>
                {`non custodial wallet account`}
              </Box>
              <Box className={"fs-12-regular blue"}>{account?.sxpAddress}</Box>
            </Stack>
          </Stack>
          <Stack>{isGuest && <CompleteButton account={account} />}</Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ProfileCard;

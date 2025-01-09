import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { Grid, Box, Stack } from "@mui/material";

import Back from "../../components/account/Back";
import AccountHeader from "../../components/account/AccountHeader";
import AccountNextButton from "../../components/account/AccountNextButton";
import Stepper from "../../components/account/Stepper";
import WalletList from "../../components/account/WalletList";

import { setAccount } from "../../store/AccountSlice";
import { addAccountList, getAccountList } from "../../store/AccountListSlice";

import { getKeccak256Hash } from "../../lib/helper/EncryptHelper";
import { encrypt } from "../../lib/helper/EncryptHelper";

import { IWalletAddresses } from "../../types/wallet/WalletTypes";
import { IAccount, IAccountList } from "../../types/AccountTypes";

import tymt2 from "../../assets/account/tymt2.png";

export interface ILocationStateConfirmInformation {
  passphrase: string;
  password: string;
  nickname: string;
  walletAddresses: IWalletAddresses;
}

const ConfirmInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { mode } = useParams();

  const { passphrase, password, nickname, walletAddresses } = (location.state as ILocationStateConfirmInformation) || {};

  const accountListStore: IAccountList = useSelector(getAccountList);

  // const tempAccountStore: IAccount = useSelector(getTempAccount);
  // const tempWalletStore: IWallet = useSelector(getTempWallet);
  // const saltTokenStore: ISaltToken = useSelector(getSaltToken);
  // const machineIdStore: IMachineId = useSelector(getMachineId);

  // const tempAccountStoreRef = useRef(tempAccountStore);
  // const tempWalletStoreRef = useRef(tempWalletStore);
  // const saltTokenStoreRef = useRef(saltTokenStore);
  // const machineIdStoreRef = useRef(machineIdStore);

  // useEffect(() => {
  //   tempAccountStoreRef.current = tempAccountStore;
  // }, [tempAccountStore]);
  // useEffect(() => {
  //   tempWalletStoreRef.current = tempWalletStore;
  // }, [tempWalletStore]);
  // useEffect(() => {
  //   saltTokenStoreRef.current = saltTokenStore;
  // }, [saltTokenStore]);
  // useEffect(() => {
  //   machineIdStoreRef.current = machineIdStore;
  // }, [machineIdStore]);

  const [loading, setLoading] = useState<boolean>(false);

  // const displayWallet: IWallet = useMemo(() => {
  //   if (mode === "signup" || mode === "guest") return tempWalletStore;
  // }, [tempWalletStore]);

  const handleBackClick = useCallback(() => {
    accountListStore?.list?.length ? navigate("/non-custodial-login-1") : navigate("/welcome");
  }, [accountListStore]);

  const handleSignUp = async () => {
    try {
      let newAccount: IAccount = {
        uid: "",
        avatar: "",
        nickName: nickname,
        sxpAddress: walletAddresses.solar,
        rsaPubKey: "",
        password: getKeccak256Hash(password),
        mnemonic: await encrypt(passphrase, password),
      };
      // const body: INonCustodySignUpReq = getReqBodyNonCustodySignUp(newAccount, tempWalletStoreRef.current, tempAccountStoreRef.current?.mnemonic);
      // const res = await AuthAPI.nonCustodySignUp(body);
      // newAccount = {
      //   ...newAccount,
      //   uid: res?.data?._id,
      // };
      dispatch(setAccount(newAccount));
      dispatch(addAccountList(newAccount));
      // dispatch(setWallet(tempWalletStoreRef.current));
      // dispatch(addWalletList(tempWalletStoreRef.current));
    } catch (err) {
      console.error("Failed to handleSignUp: ", err);
    }
  };

  const handleGuestComplete = async () => {
    // try {
    //   const newAccount: IAccount = {
    //     ...tempAccountStoreRef.current,
    //     password: getKeccak256Hash(tempAccountStoreRef.current?.password),
    //     mnemonic: await encrypt(tempAccountStoreRef.current?.mnemonic, tempAccountStoreRef.current?.password),
    //   };
    //   const body: IReqUpdateUser = {
    //     nickName: tempAccountStoreRef.current.nickName,
    //   };
    //   await UserAPI.updateUser(newAccount?.uid, body);
    //   dispatch(setAccount(newAccount));
    //   dispatch(addAccountList(newAccount));
    // } catch (err) {
    //   // console.log("Failed to handleGuestComplete: ", err);
    // }
  };

  const handleLogin = async () => {
    // try {
    //   const body1 = getReqBodyNonCustodyBeforeSignIn(tempAccountStoreRef.current, tempAccountStoreRef.current?.mnemonic);
    //   const res1 = await AuthAPI.nonCustodyBeforeSignin(body1);
    //   const salt: string = res1?.data?.salt;
    //   const token: string = getNonCustodySignInToken(salt, saltTokenStoreRef.current, tempAccountStoreRef.current?.mnemonic);
    //   dispatch(
    //     setSaltToken({
    //       salt: salt,
    //       token: token,
    //     })
    //   );
    //   const body2 = getReqBodyNonCustodySignIn(tempAccountStoreRef.current, machineIdStoreRef.current, token);
    //   const res2 = await AuthAPI.nonCustodySignin(body2);
    //   const uid = res2?.data?._id;
    //   await dispatch(fetchMyInfoAsync(uid));
    //   const newSocketHash = generateSocketHash(tempAccountStoreRef.current?.mnemonic);
    //   dispatch(setSocketHash(newSocketHash));
    //   dispatch(setMnemonic(tempAccountStoreRef?.current?.mnemonic));
    //   dispatch(getRsaKeyPairAsync(tempAccountStoreRef?.current?.mnemonic));
    //   dispatch(setLogin(true));
    //   navigate("/home");
    // } catch (err) {
    //   // console.log("Failed to handleLogin: ", err);
    // }
  };

  const handleConfirmClick = async () => {
    setLoading(true);
    if (mode === "signup") await handleSignUp();
    else if (mode === "guest") await handleGuestComplete();
    await handleLogin();
    setLoading(false);
  };

  return (
    <>
      <Grid container className="basic-container">
        <Grid item xs={12} container justifyContent={"center"}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              alignSelf: "center",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={"64px"}>
              <Stack alignItems={"center"} justifyContent={"center"}>
                <Grid container justifyContent={"center"}>
                  <Grid
                    item
                    container
                    sx={{
                      width: "520px",
                      padding: "10px 0px",
                    }}
                  >
                    <Grid item xs={12} container justifyContent={"space-between"}>
                      <Back onClick={handleBackClick} />
                      <Stepper all={0} now={0} text={t("ncca-48_almost-done-confirm")} />
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} mt={"80px"}>
                      <AccountHeader title={t("ncca-49_confirm-information")} text={t("ncca-50_welcome-to-kingdom")} />
                    </Grid>
                    <Grid item xs={12} mt={"48px"}>
                      <WalletList wallet={walletAddresses} />
                    </Grid>
                    <Grid item xs={12} mt={"40px"}>
                      <AccountNextButton text={t("ncca-51_confirm")} onClick={handleConfirmClick} disabled={loading} loading={loading} />
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
              <Box
                component={"img"}
                src={tymt2}
                sx={{
                  height: "calc(100vh - 64px)",
                }}
              />
            </Stack>
          </motion.div>
        </Grid>
      </Grid>
    </>
  );
};

export default ConfirmInformation;

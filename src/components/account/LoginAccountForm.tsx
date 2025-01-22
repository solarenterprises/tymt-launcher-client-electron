import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Box, Stack } from "@mui/material";

import AccountNextButton from "./AccountNextButton";
import InputText from "./InputText";

import { getAccount } from "../../store/AccountSlice";

import { decrypt, getKeccak256Hash } from "../../lib/helper/EncryptHelper";
import { getWalletAddressesFromPassphrase } from "../../lib/helper/WalletHelper";

import { IAccount } from "../../types/AccountTypes";
import {
  downloadFileToAppDir,
  installGame,
} from "../../lib/helper/DownloadHelper";
import { District53 } from "../../lib/game/district 53/District53";

const LoginAccountForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const accountStore: IAccount = useSelector(getAccount);

  const accountStoreRef = useRef(accountStore);

  useEffect(() => {
    accountStoreRef.current = accountStore;
  }, [accountStore]);

  const isGuest: boolean = useMemo(() => {
    if (
      accountStore?.nickName === "Guest" &&
      accountStore?.password === getKeccak256Hash("")
    )
      return true;
    return false;
  }, [accountStore]);

  const handleGuestLogin = useCallback(async () => {
    try {
      const password = "";
      const decryptedMnemonic = await decrypt(accountStoreRef?.current?.mnemonic, password);
      const walletAddresses = await getWalletAddressesFromPassphrase(decryptedMnemonic);
      navigate("/confirm-information/login", {
        state: { password: password, walletAddresses: walletAddresses, nickname: "Guest", passphrase: decryptedMnemonic },
      });
    } catch (err) {
      console.error("Failed to handleGuestLogin: ", err);
    }
  }, [accountStore]);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .test("equals", t("cca-60_wrong-password"), (value) => {
          return getKeccak256Hash(value) === accountStoreRef?.current?.password;
        })
        .test(
          "password-requirements",
          t("cca-66_password-must-be"),
          (value) => {
            if (!value) {
              return false;
            }
            const checks = [
              /[a-z]/.test(value), // Check for lowercase letter
              /[A-Z]/.test(value), // Check for uppercase letter
              /\d/.test(value), // Check for digit
              /^[^\s'";\\]+$/.test(value), // Exclude spaces, single quotes, double quotes, semicolons, and backslashes
              value.length >= 8, // Check for minimum length
            ];
            const passedConditions = checks.filter(Boolean).length;
            return passedConditions >= 4;
          }
        )
        .required(t("cca-63_required")),
    }),
    onSubmit: async () => {
      try {
        const password = formik.values.password;
        const decryptedMnemonic = await decrypt(accountStoreRef?.current?.mnemonic, password);
        const walletAddresses = await getWalletAddressesFromPassphrase(decryptedMnemonic);
        navigate("/confirm-information/login", {
          state: { password: password, walletAddresses: walletAddresses, nickname: accountStoreRef?.current?.nickName, passphrase: decryptedMnemonic },
        });
      } catch (err) {
        console.error("Failed to onSubmit at LoginAccountForm:  ", err);
      }
    },
  });

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(undefined);
  const [installing, setInstalling] = useState(false);

  const onInstallClick = useCallback(async () => {
    setInstalling(true);
    await installGame(District53);
    setInstalling(false);
  }, []);

  useEffect(() => {
    window.electronAPI.onDownloadProgress((progress: number) => {
      console.log({ progress });
      setDownloadProgress(progress);
    });
    window.electronAPI.onDownloadComplete(() => {
      alert("success");
      setDownloadSuccess(true);
    });
    window.electronAPI.onDownloadFailed(() => {
      alert("failed");
      setDownloadSuccess(false);
    });
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={"24px"}>
          {!isGuest && (
            <>
              <Stack>
                <InputText
                  id="password"
                  label={t("ncca-3_password")}
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <Box className={"fs-16-regular red"}>
                    {formik.errors.password}
                  </Box>
                )}
              </Stack>
              <AccountNextButton
                isSubmit={true}
                text={t("ncca-7_next")}
                disabled={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
              />
              <AccountNextButton
                isSubmit={false}
                text={
                  downloadProgress !== 0
                    ? `Downloading... (${downloadProgress.toFixed(2)}%)`
                    : downloadSuccess === undefined
                    ? "Download Test"
                    : downloadSuccess === true
                    ? "Download Success"
                    : "Download Failed"
                }
                onClick={() => {
                  downloadFileToAppDir(District53);
                }}
                disabled={downloadProgress > 0 && downloadProgress < 100}
              />
              <AccountNextButton
                isSubmit={false}
                text={installing ? "Installing..." : "Install Game"}
                onClick={onInstallClick}
                disabled={installing}
              />
            </>
          )}
          {isGuest && (
            <AccountNextButton
              text={t("ncca-7_next")}
              onClick={handleGuestLogin}
            />
          )}
        </Stack>
      </form>
    </>
  );
};

export default LoginAccountForm;

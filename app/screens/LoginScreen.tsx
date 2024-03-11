import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["bottom"]}
    >
      <View style={$header} />
      <View style={$welcomeBack}>
        <Text testID="login-heading" tx="loginScreen.welcome" preset="heading" style={$signIn} />
        <Text
          testID="login-heading"
          tx="loginScreen.welcomeTime"
          preset="formLabel"
          style={$welcomeTo}
          onPress={() => console.log("hey")}
        />
        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen.emailFieldLabel"
          placeholderTx="loginScreen.emailFieldPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
        />
        <Button
          testID="login-button"
          tx="loginScreen.signIn"
          style={$tapButton}
          preset="reversed"
          onPress={login}
        />
        <View style={$containerDontHave}>
          <Text
            testID="login-heading"
            tx="loginScreen.dontHave"
            preset="formLabel"
            style={$welcomeTo}
          />
          <Text
            testID="login-heading"
            tx="loginScreen.signUpText"
            preset="formLabel"
            style={$signInText}
            onPress={() => console.log("hey")}
          />
        </View>
      </View>
    </Screen>
  )
})

const $header: ViewStyle = {
  backgroundColor: colors.palette.neutral50,
  height: 100,
}
const $screenContentContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral50,
}
const $welcomeBack: ViewStyle = {
  paddingHorizontal: spacing.lg,
  backgroundColor: colors.background,
  borderTopEndRadius: 20,
  borderTopStartRadius: 20,
}

const $signIn: TextStyle = {
  paddingTop: spacing.lg,
}
const $welcomeTo: TextStyle = {
  paddingVertical: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  minHeight: 20,
  marginTop: spacing.xs,
}
const $containerDontHave: ViewStyle = {
  marginTop: spacing.xxxl,
  flexDirection: "row",
}
const $signInText: TextStyle = {
  color: colors.palette.primary100,
  paddingVertical: spacing.md,
}

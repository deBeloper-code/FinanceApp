import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useLogin } from "app/services/hooks/auth"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaLogin } from "app/services/api/auth/authSchema"

type LoginForm = {
  email: string
  password: string
}

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const {
    authenticationStore: { setAuthEmail, setAuthToken },
  } = useStores()
  const { mutate: loginUser, data, isLoading, isSuccess, error } = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const login = ({ email, password }: LoginForm) => {
    setAuthEmail(email)
    loginUser({
      email,
      password,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      setAuthToken(data.token.token)
      reset()
    }
  }, [isLoading, data, isSuccess])

  if (error?.message) {
    console.log(error?.message?.message, "error from Form")
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
        />
        {/* Fields */}
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChangeText={onChange}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              labelTx="loginScreen.emailFieldLabel"
              placeholderTx="loginScreen.emailFieldPlaceholder"
              helper={errors.email?.message || error?.message?.message}
              status={(error?.message?.message || errors.email) && "error"}
              onBlur={onBlur}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              ref={authPasswordInput}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              labelTx="loginScreen.passwordFieldLabel"
              placeholderTx="loginScreen.passwordFieldPlaceholder"
              helper={errors.password?.message}
              status={(errors.password || error?.message?.message) && "error"}
              RightAccessory={PasswordRightAccessory}
              onSubmitEditing={handleSubmit(login)}
            />
          )}
        />
        <Button
          testID="login-button"
          tx="loginScreen.signIn"
          style={$tapButton}
          preset="reversed"
          onPress={handleSubmit(login)}
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

import React, { FC, useMemo } from "react"
import * as Application from "expo-application"
import { ImageSourcePropType, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { FinanceTabScreenProps } from "app/navigators/FinanceNavigator"
import { useStores } from "app/models"
import { Text, Screen, Card, Icon, IconTypes, Button } from "app/components"
import { colors, spacing } from "app/theme"
import HeaderUser from "app/components/Molecules/HeaderUser"
import { logoutSession } from "app/services/api"

const rnrImage1 = require("../../../assets/images/bgLight.png")
const avatar = require("../../../assets/images/avatar.png")

export const HomeScreen: FC<FinanceTabScreenProps<"Home">> = function HomeScreen(_props) {
  const {
    authenticationStore: { logout },
  } = useStores()
  const imageUri = useMemo<ImageSourcePropType>(() => {
    return rnrImage1
  }, [])

  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

  const demoReactotron = React.useMemo(
    () => async () => {
      if (__DEV__) {
        console.tron.display({
          name: "DISPLAY",
          value: {
            appId: Application.applicationId,
            appName: Application.applicationName,
            appVersion: Application.nativeApplicationVersion,
            appBuildVersion: Application.nativeBuildVersion,
            hermesEnabled: usingHermes,
          },
          important: true,
        })
      }
    },
    [],
  )

  const closeSession = () => {
    logoutSession()
    logout()
  }

  return (
    <Screen
      StatusBarProps={{ backgroundColor: colors.background }}
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$container}
    >
      {/* Header */}
      <Card
        backgroundImage={imageUri}
        backgroundImageStyle={$bgImageCard}
        style={$cardHeader}
        HeadingComponent={<HeaderUser image={avatar} userName={"Zen Al"} notification={1} />}
        ContentComponent={
          <View style={$contentBalance}>
            <View style={$balance}>
              <Text preset="subheading" text="Balance" />
              <Text preset="heading" text="$ 1,434.34" />
            </View>
            <Icon icon={IconTypes.Eye} size={22} />
          </View>
        }
      />
      <View style={$containerNoTransactions}>
        <Text style={$txtNoTransaction} preset="formHelper" text="No transactions" />
        <Icon size={28} icon={IconTypes.Pay} color={colors.palette.iconColorPrimary} />
      </View>
      <Button onPress={closeSession} />
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingBottom: spacing.xxl,
}

// Card Header
const $cardHeader: ViewStyle = {
  borderWidth: 0,
  borderTopStartRadius: 0,
  borderTopEndRadius: 0,
  backgroundColor: colors.palette.primaryPr02,
  padding: 0,
  borderBottomStartRadius: 25,
  borderBottomEndRadius: 25,
  overflow: "hidden",
  marginBottom: spacing.lg,
}

const $bgImageCard: ImageStyle = {
  flex: 1,
  width: 300,
  height: "auto",
}
const $contentBalance: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.lg,
  alignItems: "center",
  marginVertical: spacing.xxl,
}
const $balance: ViewStyle = {
  width: "90%",
}
const $containerNoTransactions: ViewStyle = {
  alignItems: "center",
}
const $txtNoTransaction: TextStyle = {
  marginTop: spacing.lg,
  marginBottom: spacing.xs,
}

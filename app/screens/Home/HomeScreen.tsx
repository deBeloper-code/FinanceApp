import React, { FC, useMemo } from "react"
import * as Application from "expo-application"
import { ImageSourcePropType, ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { FinanceTabScreenProps } from "app/navigators/FinanceNavigator"
import { useStores } from "app/models"
import { ListItem, Text, Screen, Button, Card } from "app/components"
import { colors, spacing } from "app/theme"
import HeaderUser from "app/components/Molecules/HeaderUser"

const rnrImage1 = require("../../../assets/images/bgLight.png")

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
        HeadingComponent={<HeaderUser userName={""} notification={0} />}
        // ContentComponent={<Text style={$title} preset="heading" tx="demoDebugScreen.title" />}
        // FooterComponent={<Text style={$title} preset="heading" tx="demoDebugScreen.title" />}
      />
      <Card />
    </Screen>
  )
}

const $container: ViewStyle = {
  // paddingTop: spacing.lg + spacing.xl,
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
  height: 300,
}

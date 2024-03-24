/* eslint-disable react/jsx-key */
import React from "react"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"
import { View } from "react-native"

export const DemoIcon: Demo = {
  name: "Icon",
  description:
    "A component to render a registered icon. It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.",
  data: [
    <DemoUseCase
      name="Icons"
      description="List of icons registered inside the component."
      layout="row"
    >
      <View />
    </DemoUseCase>,

    <DemoUseCase name="Size" description="There's a size prop." layout="row">
      <View />
    </DemoUseCase>,

    <DemoUseCase name="Color" description="There's a color prop." layout="row">
      <View />
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily." layout="row">
      <View />
    </DemoUseCase>,
  ],
}

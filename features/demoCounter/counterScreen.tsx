// import React from "react";
// import { View, Text, Button } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../store";
// import { increment, decrement, reset } from "./counterSlice";

// export const CounterScreen = () => {
//   const count = useSelector((state: RootState) => state.counter.value);
//   const dispatch = useDispatch<AppDispatch>();

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 40, marginBottom: 20 }}>{count}</Text>

//       <Button title="Increment" onPress={() => dispatch(increment())} />
//       <Button title="Decrement" onPress={() => dispatch(decrement())} />
//       <Button title="Reset" onPress={() => dispatch(reset())} />
//     </View>
//   );
// };



import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { increment, decrement, reset } from "./counterSlice";

export const CounterScreen = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40, marginBottom: 40 }}>{count}</Text>

      {/* Buttons with spacing */}
      <View style={{ marginVertical: 5, width: 200 }}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
      </View>

      <View style={{ marginVertical: 5, width: 200 }}>
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </View>

      <View style={{ marginVertical: 5, width: 200 }}>
        <Button title="Reset" onPress={() => dispatch(reset())} />
      </View>
    </View>
  );
};

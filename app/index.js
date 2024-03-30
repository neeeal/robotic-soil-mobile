import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function Root() {
  return <Link className=" font-normal text-lg border border-red-500" href="home">Navigate to nested route</Link>;
}

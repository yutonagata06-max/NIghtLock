import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Screen = 'checkin' | 'reset' | 'reflection' | 'support';

type Reflection = {
  id: number;
  content: string;
};

const supportMessages = [
  '今日ここに戻ってきた時点で、もう前進しています。',
  '完璧じゃなくて大丈夫。今夜を整えられれば十分です。',
  '1分だけ深呼吸して、スマホを置く準備をしましょう。',
];

export default function App() {
  const [screen, setScreen] = useState<Screen>('checkin');
  const [checkInText, setCheckInText] = useState('23:42。今日はログオフします。');
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const [reflectionText, setReflectionText] = useState('');
  const [reflections, setReflections] = useState<Reflection[]>([]);

  const resetDay = useMemo(() => resetCount + 1, [resetCount]);

  const submitCheckIn = () => {
    if (!checkInText.trim()) return;
    setHasCheckedIn(true);
  };

  const submitReset = () => {
    setResetCount((prev) => prev + 1);
    setScreen('checkin');
    setHasCheckedIn(false);
  };

  const submitReflection = () => {
    const content = reflectionText.trim();
    if (!content) return;
    setReflections((prev) => [{ id: Date.now(), content }, ...prev]);
    setReflectionText('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.heading}>NightLock</Text>
        <Text style={styles.subheading}>深夜1時の静かな空気で、やさしくログオフする。</Text>

        <View style={styles.navRow}>
          <TabButton label="Check-In" active={screen === 'checkin'} onPress={() => setScreen('checkin')} />
          <TabButton label="Reset" active={screen === 'reset'} onPress={() => setScreen('reset')} />
          <TabButton label="Reflection" active={screen === 'reflection'} onPress={() => setScreen('reflection')} />
          <TabButton label="Support" active={screen === 'support'} onPress={() => setScreen('support')} />
        </View>

        <View style={styles.card}>
          {screen === 'checkin' && (
            <View style={styles.section}>
              <Text style={styles.title}>Nightly Check-In</Text>
              <Text style={styles.copy}>1〜5分で夜を区切り、意図的にスマホを閉じるためのリチュアル。</Text>
              <TextInput
                style={styles.input}
                value={checkInText}
                onChangeText={setCheckInText}
                placeholder="今夜のログオフ宣言"
                placeholderTextColor="#7A89A6"
              />
              <PrimaryButton label="Check-in を完了" onPress={submitCheckIn} />
              {hasCheckedIn && <Text style={styles.success}>Check-in complete. 休んでみよう 🌙</Text>}
            </View>
          )}

          {screen === 'reset' && (
            <View style={styles.section}>
              <Text style={styles.title}>Reset After Relapse</Text>
              <Text style={styles.copy}>Bad night? Come back anyway. 失敗ではなく再開を記録します。</Text>
              <Text style={styles.reset}>Reset Day {resetDay}</Text>
              <PrimaryButton label="今夜から戻る" onPress={submitReset} />
            </View>
          )}

          {screen === 'reflection' && (
            <View style={styles.section}>
              <Text style={styles.title}>Reflection（任意）</Text>
              <Text style={styles.copy}>短く、正直に。振り返りは義務ではありません。</Text>
              <TextInput
                style={[styles.input, styles.multiline]}
                value={reflectionText}
                onChangeText={setReflectionText}
                placeholder="例：寝る前にSNSを開くと不安が強くなる"
                placeholderTextColor="#7A89A6"
                multiline
              />
              <PrimaryButton label="保存" onPress={submitReflection} />
              <ScrollView style={styles.list}>
                {reflections.map((item) => (
                  <Text key={item.id} style={styles.listItem}>• {item.content}</Text>
                ))}
              </ScrollView>
            </View>
          )}

          {screen === 'support' && (
            <View style={styles.section}>
              <Text style={styles.title}>Quiet Support</Text>
              <Text style={styles.copy}>短く、静かに、安心を届けるメッセージ。</Text>
              {supportMessages.map((message) => (
                <View key={message} style={styles.supportBubble}>
                  <Text style={styles.supportText}>{message}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.tabButton, active && styles.tabButtonActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </Pressable>
  );
}

function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.primaryButton}>
      <Text style={styles.primaryText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#030712' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12, gap: 14 },
  heading: { color: '#E5EEFF', fontSize: 28, fontWeight: '700' },
  subheading: { color: '#94A3B8', fontSize: 14, lineHeight: 20 },
  navRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tabButton: { borderRadius: 999, borderWidth: 1, borderColor: '#1E293B', paddingHorizontal: 12, paddingVertical: 8 },
  tabButtonActive: { backgroundColor: '#1D4ED8', borderColor: '#1D4ED8' },
  tabText: { color: '#AFC2E8', fontSize: 12 },
  tabTextActive: { color: '#F8FAFC', fontWeight: '600' },
  card: { flex: 1, borderRadius: 16, borderWidth: 1, borderColor: '#1E293B', backgroundColor: '#0B1220', padding: 16 },
  section: { flex: 1, gap: 12 },
  title: { color: '#F8FAFC', fontSize: 20, fontWeight: '700' },
  copy: { color: '#9FB1CF', lineHeight: 20 },
  input: { borderWidth: 1, borderColor: '#334155', borderRadius: 12, padding: 12, color: '#E2E8F0', backgroundColor: '#0F172A' },
  multiline: { minHeight: 96, textAlignVertical: 'top' },
  primaryButton: { backgroundColor: '#2563EB', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  primaryText: { color: '#F8FAFC', fontWeight: '700' },
  success: { color: '#86EFAC', fontWeight: '600' },
  reset: { color: '#BFDBFE', fontSize: 26, fontWeight: '700' },
  list: { marginTop: 6 },
  listItem: { color: '#D1D5DB', marginBottom: 8, lineHeight: 20 },
  supportBubble: { borderRadius: 12, borderWidth: 1, borderColor: '#334155', padding: 12, backgroundColor: '#0F172A' },
  supportText: { color: '#E2E8F0', lineHeight: 20 },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useRef } from 'react';
import { gameHtml } from './assets/gameHtml';

export default function App() {
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    // Lock screen to landscape for the game
    async function lockScreen() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockScreen();
  }, []);

  const handleMessage = (event: any) => {
    try {
      const data = typeof event.nativeEvent !== 'undefined' ? JSON.parse(event.nativeEvent.data) : JSON.parse(event.data);
      if (data.type === 'SHOW_AD') {
        if (Platform.OS === 'web') {
           if (window.confirm("Watching a video ad... (Simulated). Click OK to finish.")) {
              const script = `
                  window.dispatchEvent(new MessageEvent('message', {
                    data: JSON.stringify({ type: 'REWARD_GRANTED' })
                  }));
              `;
              const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
              iframe?.contentWindow?.postMessage(JSON.stringify({ type: 'REWARD_GRANTED' }), '*');
           }
           return;
        }

        // Here we would normally show an AdMob Rewarded Ad.
        // For demonstration, we will simulate watching an ad.
        Alert.alert(
          "Rewarded Ad",
          "Watching a video ad... (Simulated)",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { 
              text: "Finish Ad", 
              onPress: () => {
                // Send reward back to Phaser
                const script = `
                  window.dispatchEvent(new MessageEvent('message', {
                    data: JSON.stringify({ type: 'REWARD_GRANTED' })
                  }));
                  true;
                `;
                webviewRef.current?.injectJavaScript(script);
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error parsing message from WebView', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {Platform.OS === 'web' ? (
        <iframe
          id="game-iframe"
          srcDoc={gameHtml}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      ) : (
        <WebView
          ref={webviewRef}
          source={{ html: gameHtml }}
          style={styles.webview}
          scrollEnabled={false}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onMessage={handleMessage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
});

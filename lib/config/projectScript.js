module.exports = {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest",
    "init": "npm run clone_ios && npm run clone_android && npm run clone_zzc_video_android && npm run clone_zzc_android_libs && npm run install_dev",
    "install_dev": "npm install && react-native link react-native-svg && react-native link @react-native-community/async-storage",
    "clone_ios": "git clone -b master ssh://git@git-repositories.zuzuche.com:10023/zzc_mobile/zzc_app/zzc_ios.git ./ios",
    "clone_android": "git clone -b master ssh://git@git-repositories.zuzuche.com:10023/zzc_mobile/zzc_app/zzc_android.git ./android",
    "clone_zzc_video_android": "git clone -b master ssh://git@git-repositories.zuzuche.com:10023/zzc_mobile/zuzuche_android_library/zzc_video_android.git ./zzc_video_android",
    "clone_zzc_android_libs": "git clone -b master ssh://git@git-repositories.zuzuche.com:10023/zzc_mobile/zuzuche_android_library/zzc_android_libs.git ./zzc_android_libs",
}
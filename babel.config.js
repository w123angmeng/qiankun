module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
//   compact: false,
    plugins: [
    '@babel/plugin-syntax-top-level-await', // 此处为新增配置
    '@babel/plugin-transform-runtime',
    "transform-remove-strict-mode", // 去除严格模式
  ]
};

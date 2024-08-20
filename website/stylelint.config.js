export default {
  plugins: ['stylelint-stylus'],
  extends: ['stylelint-stylus/standard'],
  rules: {
    'stylus/pythonic': 'never',
    'stylus/declaration-colon': 'always',
    'stylus/semicolon': 'never',
    'stylus/single-line-comment-double-slash-space-after': 'always',
    'stylus/property-no-unknown': null,
    'stylus/selector-type-no-unknown': null,
    'stylus/selector-list-comma': 'always',
    'stylus/indentation': [
      2,
      {
        indentInsideParens: 'twice',
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
      },
    ],
  },
}

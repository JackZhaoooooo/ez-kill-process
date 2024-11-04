const { onSearch, onSelect } = require('./main.js')

window.child_process = require('child_process')
window.os = require('os')
console.log('11', require('electron'))

window.exports = {
	'kill': {
		// 注意：键对应的是 plugin.json 中的 features.code
		mode: 'list', // 列表模式
		args: {
			search: onSearch,
			// 用户选择列表中某个条目时被调用
			select: onSelect,
			// 子输入框为空时的占位符，默认为字符串"搜索"
			placeholder: '搜索',
		},
	},
}

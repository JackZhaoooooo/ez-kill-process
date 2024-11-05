import { getProcessOnPort, killProcess } from './utils'

export const onSearch: IKill.ON_SEARCH = (
	action,
	searchWord,
	callbackSetList,
) => {
	callbackSetList([])
	if (!searchWord) {
		return
	}
	getProcessOnPort(searchWord)
		.then(({ pid, stdout }) => {
			if (!Number(pid)) {
				callbackSetList([])
				return
			}
			callbackSetList([
				{
					title: `找到进程:${pid}`,
					pid,
				},
			])
		})
		.catch((error) => {
			console.log('error', error)
			callbackSetList([])
		})
}

export const onSelect: IKill.ON_SELECT = (action, item, callbackSetList) => {
	if (!item?.pid) {
		callbackSetList([
			{
				title: '暂无服务可关闭',
			},
		])
		return
	}
	killProcess(item.pid)
		.then(() => {
			window.utools.showNotification('服务关闭成功')
			window.utools.outPlugin()
			window.utools.hideMainWindow()
		})
		.catch((error) => {
			console.log('error', error)
			callbackSetList([
				{
					title: '服务关闭失败',
				},
			])
		})
}

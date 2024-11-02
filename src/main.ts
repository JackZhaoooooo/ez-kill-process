import { getProcessOnPort, killProcess } from './utils'

export const onSearch: IKill.ON_SEARCH = async (
	action,
	searchWord,
	callbackSetList,
) => {
	try {
		callbackSetList([])
		if (!searchWord) {
			return
		}
		const { pid, stdout } = await getProcessOnPort(searchWord)
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
	} catch (error) {
		console.log('error', error)
		callbackSetList([])
	}
}

export const onSelect: IKill.ON_SELECT = async (
	action,
	item,
	callbackSetList,
) => {
	try {
		if (!item?.pid) {
			callbackSetList([
				{
					title: '暂无服务可关闭',
				},
			])
			return
		}
		await killProcess(item.pid)
		window.utools.showNotification('服务关闭成功')
		window.utools.outPlugin()
		window.utools.hideMainWindow()
	} catch (error) {
		console.log('error', error)
		callbackSetList([
			{
				title: '服务关闭失败',
			},
		])
	}
}

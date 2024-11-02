declare global {
	interface Window {
		child_process: {
			exec: (
				command: string,
				callback: (
					err: {
						message: string
					},
					stdout: string,
					stderr: string,
				) => void,
			) => void
		}
		os: any
		utools: {
			/** 关闭主要窗口 */
			hideMainWindow: () => void
			isMacOS: boolean
			isWindows: boolean
			/** 显示通知 */
			showNotification: (body: string) => void
			/** 退出插件 */
			outPlugin: () => void
		}
	}

	namespace IKill {
		type Action = {}

		type LIST_ITEM = {
			title: string
			description?: string
			icon?: string
			url?: string
			pid?: string
		}

		type CallbackSetList = (list: Array<LIST_ITEM>) => void

		type ON_SEARCH = (
			action: Action,
			searchWord: string,
			callbackSetList: CallbackSetList,
		) => void

		type ON_SELECT = (
			action: Action,
			itemData: LIST_ITEM,
			callbackSetList: CallbackSetList,
		) => void
	}
}

export {}

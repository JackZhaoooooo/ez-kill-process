export function getProcessOnPort(
	port: string,
): Promise<{ pid: string; stdout: string }> {
	return new Promise((resolve, reject) => {
		const platform = window.os.platform()
		let command: string

		if (window.utools.isWindows()) {
			command = `netstat -ano | findstr :${port}`
		} else {
			command = `lsof -i :${port} | grep LISTEN | awk '{print $2}'`
		}

		window.child_process.exec(command, (err, stdout, stderr) => {
			if (err) {
				reject('暂无占用端口的服务')
				return
			}

			if (stderr) {
				reject('暂无占用端口的服务')
				return
			}

			let pid: string | undefined
			if (window.utools.isWindows()) {
				const lines = stdout.trim().split('\n')
				if (lines.length > 0) {
					const parts = lines[0].trim().split(/\s+/)
					pid = parts[parts.length - 1]
				}
			} else {
				pid = stdout.trim()
			}

			if (pid) {
				resolve({ pid, stdout: stdout })
			} else {
				reject('暂无占用端口的服务')
			}
		})
	})
}

export function killProcess(pid: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const platform = window.os.platform()
		let command: string

		if (window.utools.isWindows()) {
			command = `taskkill /F /PID ${pid}`
		} else {
			command = `kill -9 ${pid}`
		}

		window.child_process.exec(command, (err, stdout, stderr) => {
			if (err) {
				reject('关闭服务失败' + err.message)
				return
			}

			if (stderr) {
				reject('关闭服务失败' + stderr)
				return
			}

			resolve()
		})
	})
}

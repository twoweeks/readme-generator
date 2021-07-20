'use strict'

document.addEventListener('DOMContentLoaded', () => {
	const storageItemName = 'readme_generator_data'

	const getData = ID => $make.qs('#' + ID).value.replace(/\n/g, '\r\n')
	const addData = (to, what) => (what != '') ? `${to}: ${what}\r\n\r\n` : ''

	const checkReqs = () => (getData('name') == '' || getData('descriptlion') == '' || getData('tools') == '') ? false : true

	const preview = content => {
		let dialog =          $create.elem('dialog', '', 'preview')
		let dialogContent =   $create.elem('div')
		let dialogCloseBtn =  $create.elem('button', 'Закрыть')
		let dialogDlBtn =     $make.qs('.dl').cloneNode(true)
		let dialogSep =       document.createTextNode(' / ')

		document.body.style.overflowY = 'hidden'
		dialog.style.display = 'flex'

		dialogContent.innerHTML += '<h3>Предпросмотр</h3>'
		dialogContent.innerHTML += `<textarea readonly>${content}</textarea>`

		dialogCloseBtn.addEventListener('click', () => {
			dialog.remove()
			document.body.style.overflowY = 'visible'
		})

		dialogContent.appendChild(dialogCloseBtn)
		dialogContent.appendChild(dialogSep)
		dialogContent.appendChild(dialogDlBtn)
		dialog.appendChild(dialogContent)
		$make.qs('main').appendChild(dialog)
	}

	if ($storage.test()) {
		$make.qs('.btn-save').style.display = 'block'
		let data = JSON.parse($storage.get(storageItemName))

		for (let key in data) {
			$make.qs('#' + key).value = data[key]
		}
	}

	$make.qs('.btn-show').addEventListener('click', () => {
		$make.qs('table').classList.toggle('hide')
	})

	$make.qs('.btn-gen').addEventListener('click', () => {
		let readme =   ''
		let btnDl =    $make.qs('.dl')
		let btnPrev =  $make.qs('.prev')
		let dls =      $make.qs('.dls')

		dls.style.display = 'none'
		btnDl.setAttribute('href', 'javascript:void(0)')

		if (!checkReqs()) { return }

		readme += addData('Названиe игры', getData('name'))
		readme += addData('Жанр', getData('genre'))
		readme += addData('Описание', getData('descriptlion'))
		readme += addData('Управление', getData('controls'))
		readme += addData('Инструменты', getData('tools'))
		readme += addData('Ачивки', getData('ach'))
		readme += addData('Блог', getData('link'))
		readme += addData('Почта', getData('email'))
		readme += addData('Трипкод', getData('trip'))
		readme += addData('Зависимости', getData('dep'))
		readme += addData('Исходники', getData('repo'))
		readme += addData('Сторонние ресурсы', getData('third-party'))

		dls.style.display = 'table-row'
		btnDl.setAttribute('href', 'data:text/plain;charset=utf-8;base64,' + base64.encode(readme))

		btnPrev.onclick = e => preview(readme)
	})

	$make.qs('.btn-save').addEventListener('click', () => {
		let data =    {}
		let inputs =  $make.qs('table tr:not(.no-parse) *[id]', ['a'])

		Array.from(inputs).forEach(input => {
			if (input.value != '') data[input.id] = input.value
		})

		$storage.set(storageItemName, JSON.stringify(data))
	})
})

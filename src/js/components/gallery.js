import { Fancybox } from '@fancyapps/ui';

export default function gallery() {
    Fancybox.bind("[data-fancybox]", {
        l10n: {
            PANUP: "Переместить вверх",
            PANDOWN: "Переместить вниз",
            PANLEFT: "Переместить влево",
            PANRIGHT: "Переместить вправо",
            ZOOMIN: "Увеличить",
            ZOOMOUT: "Уменьшить",
            TOGGLEZOOM: "Переключить уровень масштабирования",
            TOGGLE1TO1: "Переключить уровень масштабирования",
            ITERATEZOOM: "Переключить уровень масштабирования",
            ROTATECCW: "Повернуть против часовой стрелки",
            ROTATECW: "Повернуть по часовой стрелке",
            FLIPX: "Повернуть горизонтально",
            FLIPY: "Повернуть вертикально",
            FITX: "Подогнать по горизонтали",
            FITY: "Подогнать по вертикали",
            RESET: "Сброс",
            TOGGLEFS: "Включить полноэкранный режим",
            CLOSE: "Закрыть",
            NEXT: "Следующий",
            PREV: "Предыдущий",
            MODAL: "Вы можете закрыть это модальное окно клавишей ESC",
            ERROR: "Запрошенное содержимое не может быть загружено. <br/> Пожалуйста, повторите попытку позже.",
            IMAGE_ERROR: "Изображение не найдено",
            ELEMENT_NOT_FOUND: "HTML элемент не найден",
            AJAX_NOT_FOUND: "Ошибка загрузки AJAX : Не найдено",
            AJAX_FORBIDDEN: "Ошибка загрузки AJAX : Запрещено",
            IFRAME_ERROR: "Ошибка загрузки страницы",
            TOGGLE_ZOOM: "Увеличить",
            TOGGLE_THUMBS: "Включить миниатюры",
            TOGGLE_SLIDESHOW: "Включить слайдшоу",
            TOGGLE_FULLSCREEN: "Включить полноэкранный режим",
            DOWNLOAD: "Скачать"
        }
    });
}
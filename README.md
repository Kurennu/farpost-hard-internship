# Тестовое задание на практику FarPost frontend-hard
Веб-приложение для просмотра детализации счета
**Автор:** Петрова Александра

## Задание и реализация
*Основное задание:*
- Просмотр детализации счета с группировкой по дням
- Фильтрация по:
  - Типу транзакции
  - Периоду
  - Сумме
- Адаптивный дизайн для мобильных устройств
*Дополнительное задание*
- График для отображения трат
- Сборка проекта в Docker-контейнер

### Структура проекта
Я организовала структуру проекта согласно методологии FSD:
```
account-details/
├── public/
│   └── transactions.json
├── src/
│   ├── app                # приложение
│   ├── entities/          # бизнес-объекты
│   │   └── transaction/
│   ├── features/          # фичи
│   │   ├── transaction-filters/
│   │   ├── pagination/
│   │   └── expense-chart/
│   ├── pages/             # страницы
│   │   └── AccountDetailsPage/
│   ├── shared/            # ресурсы
│   └── widgets/           # виджеты
│       └── transactions-table/
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

## Технологии
*Фронт*
- React 18.2.0
- Chart.js, react-chartjs-2
- SCSS

*Контейнеризация*
- Docker
- Nginx

*Архитектура и методологии*
- FSD
- БЭМ

## Требования
- Node.js 18+, npm 9+ (для локального запуска)
- Docker (для запуска в контейнере)

## Установка и запуск

### Локально
1. Клонируйте репозиторий:
```bash
git clone https://github.com/Kurennu/farpost-hard-internship.git
```

2. Перейдите в директорию проекта:
```bash
cd account-details
```

3. Установите зависимости:
```bash
npm install
```

4. Запустите приложение:
```bash
npm start
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

### Запуск в Docker

1. Убедитесь, что Docker и Docker Compose установлены

2. Перейдите в директорию проекта:
```bash
cd account-details
```

3. Соберите и запустите контейнеры:
```bash
docker-compose up --build -d
```
Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)
# Тестовое задание на практику FarPost frontent-hard
Веб-приложение для просмотра детализации счета

## Технологии
- React 18.2.0
- Docker
- Nginx
- SCSS
- Feature-Sliced Design

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
import React from "react";
import './DeckStatistics.css';

export default function DeckStatistics({cardsCount, gamesCount, userRating, lastRepeatTime}) {
    const playedBefore = isOk(gamesCount) && gamesCount > 0;
    return (
        <div className='deck-statistics'>
            <div>Колличество карт: {cardsCount}</div>
            {
                isOk(gamesCount) &&
                <div>Колличество игр: {gamesCount}</div>
            }
            {
                isOk(userRating) && playedBefore &&
                <div>Ваш рейтинг: {Math.round(userRating * 100)}%</div>
            }
            {
                isOk(lastRepeatTime) && playedBefore &&
                <div>Последняя тренировка: {getLastRepeatTime(lastRepeatTime)}</div>
            }
        </div>
    );
}

const isOk = value => value !== undefined;

const getLastRepeatTime = date => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 60 / 60 / 24 / 30);
    if (interval >= 1)
        return 'Больше месяца назад';

    interval = Math.floor(seconds / 60 / 60 / 24 / 7);
    if (interval > 1)
        return `${interval} недели назад`;
    if (interval === 1)
        return 'Неделю назад';

    interval = Math.floor(seconds / 60 / 60 / 24);
    if (interval > 5)
        return `${interval} дней назад`;
    if (interval > 1)
        return `${interval} дня назад`;
    if (interval === 1)
        return 'Вчера';

    return 'Сегодня';
};

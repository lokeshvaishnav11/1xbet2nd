import React from 'react';


const winners = [
  {
    name: 'Mem***FFF',
    avatar: 'https://chicken-road.zone/assets/person17-q-XMVoEb.png',
    amount: '430.00',
    gameImg: 'https://chicken-road.zone/assets/lotterycategorytrx-BQtgv98D.png',
  },
  {
    name: 'Mem***EEE',
    avatar: 'https://chicken-road.zone/assets/person16-BSWOqo6F.png',
    amount: '820.00',
    gameImg: 'https://chicken-road.zone/assets/lotterycategorytrx-BQtgv98D.png',
  },
  {
    name: 'Mem***DDD',
    avatar: 'https://chicken-road.zone/assets/person15-CLyM484-.png',
    amount: '290.00',
    gameImg: 'https://chicken-road.zone/assets/lotterycategorywingo-az3YUsC-.png',
  },
  {
    name: 'Mem***CCC',
    avatar: 'https://chicken-road.zone/assets/person14-DwyWmQfy.png',
    amount: '380.00',
    gameImg: 'https://chicken-road.zone/assets/rummyicon-CIslnG31.png',
  },
  {
    name: 'Mem***BBB',
    avatar: 'https://chicken-road.zone/assets/person13-DEwaMq4g.png',
    amount: '670.00',
    gameImg: 'https://chicken-road.zone/assets/lotterycategorytrx-BQtgv98D.png',
  },
];

const WinningInfo = () => {
  return (
    <div className="py-3 text-white ">
      <h2 className="h5 fw-semibold mb-4">Winning Information</h2>
      <div className="d-flex flex-column gap-3">
        {winners.map((winner, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-start gap-3 p-3 rounded shadow-sm"
            style={{ backgroundColor: '#2B3270', animation: 'fadeInFromTop 0.3s ease-in-out' }}
          >
            {/* Avatar + Name */}
            <div className="d-flex align-items-center gap-2" style={{ width: '35%' }}>
              <img
                src={winner.avatar}
                alt="Avatar"
                className="rounded-circle object-cover"
                style={{ width: '40px', height: '40px' }}
              />
              <p className="mb-0 fw-semibold small">{winner.name}</p>
            </div>

            {/* Game Info */}
            <div className="d-flex align-items-center gap-2" style={{ width: '65%' }}>
              <div
                className="d-flex justify-content-center align-items-center rounded"
                style={{ backgroundColor: '#374992', width: '4.2rem', height: '3rem' }}
              >
                <img
                  src={winner.gameImg}
                  alt="Game"
                  className="rounded"
                  style={{ width: '48px', height: '32px', objectFit: 'cover' }}
                />
              </div>
              <div>
                <p className="mb-1 fw-bold text-white small">Receive {winner.amount}</p>
                <p className="mb-0 text-light small">Winning amount</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningInfo;

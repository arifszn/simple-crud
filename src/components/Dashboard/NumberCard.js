import React from 'react'
import { Card, Typography } from 'antd';
import CountUp from 'react-countup'
import './NumberCard.scss';

const { Text } = Typography;

const NumberCard = ({ icon, color, title, number, countUp, loading= false }) => {
    return (
        <div className='numberCardWrap z-shadow'>
            <Card
                loading={loading}
                hoverable={true}
                bordered={false}
                style={{padding: '22px 0'}}
            >
                <span className='iconWarp' style={{ color }}>
                    {icon}
                </span>
                <div className='content'>
                    <p className='title'>
                        <Text
                            style={{ width: '100%', color: 'grey' }}
                            ellipsis={{ tooltip: title || 'No Title' }}
                        >
                            {title || 'No Title'}
                        </Text>
                    </p>

                    <p className='number'>
                        <CountUp
                            start={0}
                            end={number}
                            duration={2.75}
                            useEasing
                            useGrouping
                            separator=","
                            {...(countUp || {})}
                        />
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default NumberCard;

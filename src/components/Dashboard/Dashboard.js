import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Image } from 'antd';
import { ProfileOutlined, ScheduleOutlined, CarryOutOutlined, InfoCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import RedditImageFetcher from 'reddit-image-fetcher';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import NumberCard from './NumberCard';
import HTTP from '../HTTP';
import Routes from '../../helpers/Routes';
import moment from 'moment';
import Utils from '../../helpers/Utils';

const { Text } = Typography;

const wallpaperHeight = 158;

const wallpaperStyle = {
    objectFit: 'cover'
}

const LoadingWrapper = styled.div`
    background: ghostwhite;
    width: 100%;
    height: ${wallpaperHeight}px;
    align-items: center;
    justify-content: center;
    -webkit-box-align: center;
    display: inline-flex;
`;

const totalColor = Utils.randomHexColor();
const todayColor = Utils.randomHexColor();
const weekColor = Utils.randomHexColor();
const monthColor = Utils.randomHexColor();

/**
 * Dashboard component
 */
const Dashboard = () => {
    const user = useSelector(state => state.user.value);
    const [date, setDate] = useState(new Date());
    const [componentLoading, setComponentLoading] = useState(true);
    const [wallpaper, setWallpaper] = useState(null);
    const [productData, setProductData] = useState({
        total: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
    });

    useEffect(() => {
        var intervalId = setInterval( () => tick(), 1000 );

        getRandomWallpaper();
        getStats();
        
        // Cleanup interval
        return () => {
            clearInterval(intervalId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tick = () => {
        setDate(new Date());
    }

    const getRandomWallpaper = () => {
        RedditImageFetcher
        .fetch({type: 'wallpaper'})
        .then(result => {
            if (result.length) {
                setWallpaper(result[0]);
            }
        });
    }

    const getStats = () => {
        if (!componentLoading) {
            setComponentLoading(true);
        }

        const todayStartDateUtc = moment.utc(moment().startOf('day')).format('YYYY-MM-DD HH:mm:ss');
        const todayEndDateUtc = moment.utc(moment().endOf('day')).format('YYYY-MM-DD HH:mm:ss');

        const thisWeekStartDateUtc = moment.utc(moment().startOf('week').startOf('day')).format('YYYY-MM-DD HH:mm:ss');
        const thisWeekEndDateUtc = moment.utc(moment().endOf('week').endOf('day')).format('YYYY-MM-DD HH:mm:ss');

        const thisMonthStartDateUtc = moment.utc(moment().startOf('month').startOf('day')).format('YYYY-MM-DD HH:mm:ss');
        const thisMonthEndDateUtc = moment.utc(moment().endOf('month').endOf('day')).format('YYYY-MM-DD HH:mm:ss');
        
        HTTP.get(Routes.api.stats, {
            params: {
                todayStartDate: todayStartDateUtc,
                todayEndDate: todayEndDateUtc,
                thisWeekStartDate: thisWeekStartDateUtc,
                thisWeekEndDate: thisWeekEndDateUtc,
                thisMonthStartDate: thisMonthStartDateUtc,
                thisMonthEndDate: thisMonthEndDateUtc,
            }
        })
        .then(response => {
            Utils.handleSuccessResponse(response, () => {
                const result = response.data.payload;
                if (result) {
                    //product
                    setProductData({
                        total: result.product.total,
                        today: result.product.totalToday,
                        thisWeek: result.product.totalThisWeek,
                        thisMonth: result.product.totalThisMonth
                    });
                }
            })
        })
        .catch(error => {
            Utils.handleException(error);
        }).finally(() => {
            setComponentLoading(false);
        });
    }

    return (
        <React.Fragment>
            <Row gutter={24}>
                <Col 
                    xl={18}
                    lg={18}
                    md={24}
                    sm={24}
                    xs={24}
                >
                    <Row>
                        <Col 
                            xl={24}
                            lg={24}
                            md={24}
                            sm={24}
                            xs={24}
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <Card
                                hoverable={true}
                                title={'Hi'}
                                bordered={false}
                                className='z-shadow'
                            >
                                <Text type="secondary">Welcome back, <Text>{user && user.name}</Text>.</Text>
                            </Card>
                        </Col>
                        <Col 
                            xl={24}
                            lg={24}
                            md={24}
                            sm={24}
                            xs={24}
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <Row gutter={24}>
                                <Col md={6} sm={12} xs={24} style={{marginBottom: 24}}>
                                    <NumberCard loading={componentLoading} icon={<ProfileOutlined />} color={totalColor} title='Total Product' number={productData.total}/>
                                </Col>
                                <Col md={6} sm={12} xs={24} style={{marginBottom: 24}}>
                                    <NumberCard loading={componentLoading} icon={<CarryOutOutlined />} color={todayColor} title='Added Today' number={productData.today}/>
                                </Col>
                                <Col md={6} sm={12} xs={24} style={{marginBottom: 24}}>
                                    <NumberCard loading={componentLoading} icon={<ScheduleOutlined/>} color={weekColor} title='Added this Week' number={productData.thisWeek}/>
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                    <NumberCard loading={componentLoading} icon={<CalendarOutlined />} color={monthColor} title='Added this Month' number={productData.thisMonth}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col 
                    xl={6}
                    lg={6}
                    md={24}
                    sm={24}
                    xs={24}
                >
                    <Row gutter={24}>
                        <Col
                            xl={24}
                            lg={24}
                            md={24}
                            sm={24}
                            xs={24}
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <Card
                                hoverable={true}
                                size="small"
                                bordered={false}
                                className='z-shadow'
                            >
                                <Card.Meta title={date.toDateString()} description={date.toLocaleTimeString()} />
                            </Card>
                        </Col>
                        <Col
                            xl={24}
                            lg={24}
                            md={24}
                            sm={24}
                            xs={24}
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <Card
                                hoverable={true}
                                size="small"
                                bordered={false}
                                className='z-shadow'
                                loading={wallpaper ? false : true}
                                cover={
                                    wallpaper
                                    ?
                                    <div style={{opacity: '0.7'}}>
                                        <Image
                                            height={wallpaperHeight}
                                            src={wallpaper.image}
                                            style={wallpaperStyle}
                                            placeholder={
                                                <Image
                                                    height={wallpaperHeight}
                                                    width={'100%'}
                                                    preview={false}
                                                    src={wallpaper.thumbnail}
                                                    style={wallpaperStyle}
                                                />
                                            }
                                        />
                                    </div>
                                    :
                                    <LoadingWrapper/>
                                }
                            >
                                <Text type="secondary" strong>Daily Wallpaper</Text> <a href="https://www.npmjs.com/package/reddit-image-fetcher" target="_blank" rel="noreferrer"><InfoCircleOutlined style={{paddingLeft: '2px', color: 'rgba(0, 0, 0, 0.45)'}}/></a>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Dashboard;
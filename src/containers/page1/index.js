import React, { PureComponent } from 'react'
import Drowdow from '../../components/dropdow'
import Data from '../../database/raw_database.json'
const styles = {
    row: {
        display: "flex",
        padding: 10
    },
    col: {
        marginRight: 10
    }
}
export default class Page1 extends PureComponent {
    state = {
        provinces: [],
        districs: [],
        amphoes: [],
        provinceSelect: 100,
        districsSelect: 10000,
        amphoesSelect: 1000,
    }
    helper(Data, init) {
        let list = [init]
        Data.forEach(item => {
            const validate = list.find(x => x.province_code == item.province_code)
            if (!validate) {
                list.push(item)
            }
        })
        return list
    }
    componentDidMount() {
        let list = [{ "province_code": 100, "province": "เลือกจังหวัด" }]
        Data.forEach(item => {
            const validate = list.find(x => x.province_code == item.province_code)
            if (!validate) {
                list.push(item)
            }
        })
        const mappingData = list.map(item => {
            item["label"] = item["province"]
            item["id"] = item["province_code"]
            return item
        })
        this.setState({ provinces: mappingData })
    }
    onProvinceChange(value) {
        let list = [{ "amphoe_code": 1000, "amphoe": "เลือกอำเภอ" }]
        const dataRaw = Data.filter(i => i.province_code == value)
        dataRaw.forEach(item => {
            const validate = list.find(x => x.amphoe_code == item.amphoe_code)
            delete item["id"]
            delete item["label"]
            if (!validate) {
                list.push(item)
            }
        })
        const mappingData = list.map(item => {
            item["label"] = item["amphoe"]
            item["id"] = item["amphoe_code"]
            return item
        })
        this.setState({
            provinceSelect: value,
            amphoes: mappingData
        });
    }
    onDistricChange(value) {
        this.setState({
            districsSelect: value
        });
    }
    onAmphoeChange(value) {
        let list = [{ "district_code": 10000, "district": "เลือกตำบล" }]
        const dataRaw = Data.filter(i => i.amphoe_code == value)
        dataRaw.forEach(item => {
            const validate = list.find(x => x.district_code == item.district_code)
            delete item["id"]
            delete item["label"]
            if (!validate) {
                list.push(item)
            }
        })
        const mappingData = list.map(item => {
            item["label"] = item["district"]
            item["id"] = item["district_code"]
            return item
        })
        this.setState({
            amphoesSelect: value,
            districs: mappingData
        });
    }
    render() {
        const { provinces, amphoes, districs, districsSelect, provinceSelect, amphoesSelect } = this.state
        return (
            <div style={styles.row}>
                <div style={styles.row}><div style={styles.col}>
                    จังหวัด</div><Drowdow data={provinces} value={provinceSelect} onChange={e => this.onProvinceChange(e)}></Drowdow></div>
                <div style={styles.row}><div style={styles.col}>
                    อำเภอ</div><Drowdow data={amphoes} value={amphoesSelect} onChange={e => this.onAmphoeChange(e)}></Drowdow></div>
                <div style={styles.row}><div style={styles.col}>
                    ตำบล</div><Drowdow data={districs} value={districsSelect} onChange={e => this.onDistricChange(e)}></Drowdow></div>

                <span>{provinceSelect}</span>

            </div>
        )
    }
}
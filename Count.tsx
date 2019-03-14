import * as React from 'react';
import { Button } from 'antd';

const styles = require("./test.less");

interface Props {
    btnType?: 'primary' | 'danger' | 'dashed' | 'default';
}

interface State {
    count: number
}
export default class Count extends React.Component<Props, State>{
    public readonly state: Readonly<State> = {
        count: 1
    }
    public render() {
        const { btnType = 'default' } = this.props;
        const { count } = this.state;
        return (
            <div className={styles.wrap}>
                {count}
                <Button onClick={this.add} type={btnType} className={styles.button}>+</Button>
            </div>
        )
    }
    protected add = (): void => {
        this.setState({
            count: this.state.count + 1
        })
    }
}

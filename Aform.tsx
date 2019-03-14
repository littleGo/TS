import * as React from 'react';
import { Button, Form, Input, Row } from 'antd';
import { connect } from 'dva';
import { WrappedFormUtils } from "antd/lib/form/Form";

const styles = require("./test.less");
const FormItem = Form.Item;
interface Props {
    btnType: 'primary' | 'danger' | 'dashed' | 'default';
    dispatch: any;
    form: WrappedFormUtils;
}
@connect(state => ({
    test: state.test
}))
class Aform extends React.Component<Partial<Props>>{
    public render() {
        const { btnType = 'default', form: { getFieldDecorator } } = this.props;
        const formItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 20,
            },
        };
        return (
            <div className={styles.wrap}>
                <Form>
                    <FormItem label="输入值" {...formItemLayout} >
                        {getFieldDecorator('inputVal', {
                            rules: [
                                { required: true, message: '请输入' },
                            ]
                        })(<Input />)}
                    </FormItem>
                    <Row className={styles.subBtn}><Button type={btnType} onClick={this.submit}>提交</Button></Row>
                </Form>
            </div>
        )
    }
    protected submit = (): void => {
        const { form: { validateFields }, dispatch } = this.props;
        validateFields((err, fieldsValue) => {
            if (err) return;
            console.log(fieldsValue);
            dispatch({
                type: 'test/fetch',
            })
        });
    }
}
export default Form.create()(Aform);

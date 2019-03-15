import * as React from 'react';
import { SFC } from 'react';
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
const Bform: SFC<Partial<Props>> = ({ btnType = 'default', dispatch, form }) => {
    const { getFieldDecorator, validateFields } = form;
    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };
    const submit = (): void => {
        validateFields((err, fieldsValue) => {
            if (err) return;
            console.log(fieldsValue);
            dispatch({
                type: 'test/fetchList',
                payload: { ...fieldsValue }
            })
        });
    }
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
                <Row className={styles.subBtn}><Button type={btnType} onClick={submit}>提交</Button></Row>
            </Form>
        </div>
    )

}
const FormBform = Form.create()(Bform);
export default connect(state => ({
    test: state.test
}))(FormBform)

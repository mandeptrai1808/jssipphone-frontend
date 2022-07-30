import React, {useState, useRef, useEffect} from 'react'
import { Button, Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';




export default function ModalTemplate() {
    
    const dispatch = useDispatch();
    const {showModal} = useSelector(state => state.PhoneReducer);
    
    // const [configData, setConfigData] = useState({
    //     wsUrl: 'wss://sbc03.tel4vn.com:7444',
    //     sipUrl: '105@2-test1.gcalls.vn:50061',
    //     sipPass: 'test1105'
    // })

    const configData = useSelector(state => state.PhoneReducer).configUA;
    
    const [form] = Form.useForm();
    
    

     useEffect(() => {
        form.setFieldsValue({
            wsUrl: configData.wsUrl,
            sipUrl: configData.sipUrl,
            sipPass: configData.sipPass
         });
     }, [])
 

  return (
    <div>
        <Modal title="Configuration" visible={showModal} footer={false} onCancel={() => {
          dispatch({type: "CLOSE_MODAL"})
        }}>
         <Form
         form={form}
          name="basic"
          initialValues={{ remember: true }}
            onFinish={(value) => {
              console.log(value)
            dispatch({
                type: "UPDATE_CONFIG",
                content: value
            })
            dispatch({type: "CLOSE_MODAL"})
            }}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
            <p className='mb-1 font-bold'>WebSocket URL</p>
          <Form.Item
            // value={configData.wsUrl}
            name="wsUrl"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
           
            <Input  className="w-full" placeholder="WebSocket URL..."/>
          </Form.Item>
          <p className='mb-1 font-bold'>SIP URL</p>
          <Form.Item
            name="sipUrl"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
           
            <Input className="w-full" placeholder="SIP URL..."/>
          </Form.Item>
          <p className='mb-1 font-bold'>SIP Password</p>
          <Form.Item
            name="sipPass"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
           
            <Input className="w-full" placeholder="SIP Password..."/>
          </Form.Item>

          <Form.Item>
            <Button type="danger w-full" htmlType="submit">
            Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

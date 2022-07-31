import React, {useState, useRef, useEffect} from 'react'
import { Button, Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CreateNewAddress, UpateAddress } from '../Redux/Actions/AppAction';

export default function SaveAddressModal() {

  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
    
    const dispatch = useDispatch();
    const {showAddressModal,newAddressPhone, nameAddress, isUpdate, idItem} = useSelector(state => state.PhoneReducer);    
    
    const [form] = Form.useForm();
    

     useEffect(() => {
        form.setFieldsValue({
            name: nameAddress,
            phone: newAddressPhone,
         });
     }, [nameAddress, newAddressPhone])
 

  return (
    <div>
        <Modal title={`${isUpdate ? "Chỉnh sửa thông tin" : "Thêm số điện liên lạc"}`} visible={showAddressModal} footer={false} onCancel={() => {
          dispatch({type: "CLOSE_SAVE_ADDRESS"})
        }}>
         <Form
         form={form}
          name="basic"
          initialValues={{ remember: true }}
            onFinish={(value) => {
              const data = {
                phone: value.phone,
                name: value.name,
                userId: userData.id
              }
              if (isUpdate){
                dispatch(UpateAddress(data, idItem))
              }
              else dispatch(CreateNewAddress(data))
            }}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
            <p className='mb-1 font-bold'> Tên cần lưu: </p>
          <Form.Item
            // value={configData.wsUrl}
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
           
            <Input  className="w-full" placeholder="Nhập tên người cần lưu"/>
          </Form.Item>


          <p className='mb-1 font-bold'>Số điện thoại</p>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
           
            <Input className="w-full" placeholder="Số điện thoại..."/>
          </Form.Item>

          <Form.Item>
            <Button type="danger w-full" htmlType="submit">
            {isUpdate ? "Lưu thay đổi" : "Lưu số điện thoại"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

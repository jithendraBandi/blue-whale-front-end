import { Button, Col, Modal, Row } from "antd";
import html2canvas from "html2canvas";
import React, { useRef } from "react";
import Logo from "../images/logo.png";
import { ShopOutlined, WhatsAppOutlined } from "@ant-design/icons";

const InvoiceViewModal = ({
  invoiceModal,
  setInvoiceModal,
  record,
  setRecord,
}) => {
  const handleCancel = () => {
    setInvoiceModal(false);
    setRecord(null);
  };

  const invoiceRef = useRef();

  const handleDownload = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "downloaded-image.png";
      link.click();
    });
  };

  const findTotalQuantity = () => {
    let totalQuantity = 0;
    record?.transactionItemDetails?.forEach(item => totalQuantity+= item?.quantity);
    return totalQuantity;
  }

  return (
    <Modal
      title={
        <div className="space-between">
          <h1>Invoice</h1>
          <Button onClick={handleDownload}>Download</Button>
        </div>
      }
      open={invoiceModal}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      maskClosable={false}
      width={800}
    >
      <div ref={invoiceRef} className="invoice-data-view">
        <div>
          <div className="invoice-header">
          <div className="flex-row">
          <img className="logo-image" src={Logo} alt="logo" />
          <h3>Blue Whale Aqua Solutions</h3>
        </div>
          </div>
          <div className="invoice-body">
          <table>
            <tr>
              <td className="invoice-label">Invoice:</td>
              <td className="invoice-data">BWAS{record?.id}</td>
              <td className="invoice-label">Name:</td>
              <td className="invoice-data">{record?.name}</td>
            </tr>
            <tr>
              <td className="invoice-label">Mobile:</td>
              <td className="invoice-data">{record?.mobileNumber}</td>
              <td className="invoice-label">Date: </td>
              <td className="invoice-data">{record?.date}</td>
            </tr>
            <tr>
              <td className="invoice-label">Address: </td>
              <td className="invoice-data">{record?.address}</td>
            </tr>
          </table>
          <div className="invoice-items-table">
            <table>
              <thead>
                <tr className="invoice-item-table-header">
                  <th>S.No</th>
                  <th className="half-width">Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {record?.transactionItemDetails?.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                      {item?.itemName} ({item?.categoryName})
                    </td>
                    <td>{item?.quantity}</td>
                    <td>{item?.cost}</td>
                    <td>{item?.quantity * item?.cost}</td>
                  </tr>
                ))}
                <tr style={{backgroundColor:"lightpink"}}>
                  <td></td>
                  <td>Final Amount</td>
                  <td>{findTotalQuantity()}</td>
                  <td></td>
                  <td>{record?.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          <div className="invoice-footer space-between">
            <span><span><WhatsAppOutlined className="green-color" /></span> 7306655710</span>
            <span><span><span><ShopOutlined className="yellow-color" /></span> Ramdas street, near bus stand, Nidadavole, East Godavari District, AP</span></span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceViewModal;

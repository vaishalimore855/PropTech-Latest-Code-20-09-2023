import React from 'react'

function DocumentVerification() {
    
  return (
    <div id="main" >
    <div class="main-content">
    <div class="container">
        {/* <!-- begin::page-header --> */}
        <div class="page-header">
            <h4>Document Verification Details</h4>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#"style={{ fontSize: "16px" }}>Home</a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="#"style={{ fontSize: "16px" }}>Request</a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="#" style={{ fontSize: "16px" }}>Document Verification</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page"style={{ fontSize: "16px" }}>Document Verification Details</li>
                </ol>
            </nav>
        </div>
        {/* <!-- end::page-header --> */}

        <div class="row">
            <div class="col-md-12">

                <div class="card">
                    <h2 class="mt-5 mb-3" style={{marginLeft: "40px", fontWeight: "bold"}} >Pride Wellington,Charholi Budruk</h2>
                    <div class="card-body d-flex">
                        <div class="view-document-main col-lg-6">
                            <dl class="row ">
                                <dt class="col-5">Owner Name:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Contact Number:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Email Address:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Address:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Verification Status:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <h3 style={{fontWeight: "bold", marginBottom: "35px"}}>Propperty Document Images</h3>
                               <div class="d-flex mb-5">
                                   <div style={{width: "200px" , height: "200px", border: "1px black solid", padding: "10px", marginRight: "20px"}}>
                                     <img src="../default/assets/media/image/dumy-doc-1.png" alt="" width="100%" height="100%" /></div>
                                   <div style={{width: "200px" , height: "200px", border: "1px black solid", padding: "10px", marginRight: "20px"}}> 
                                   <img src="../default/assets/media/image/dumy-doc-1.png" alt="" width="100%" height="100%" /></div>
                               </div>
                            
                        </div>
                        <div class="view-document-main col-lg-6">
                            <dl class="row ">
                                <dt class="col-5">Property Name:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Property Description:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">RERA Number:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Verification Status:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Property Type:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Location:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Price:</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                            <dl class="row ">
                                <dt class="col-5">Area(in sqft.):</dt>
                                <dd class="col-7">XYZ</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>
</div>
  )
}

export default DocumentVerification
provider "oci" {
  auth          = "APIKey"
  tenancy_ocid  = var.tenancy_ocid
  user_ocid     = var.user_ocid
  fingerprint   = var.fingerprint
  private_key   = file(var.private_key_path)
  region        = var.region
}

# resource "oci_artifacts_container_repository" "image_repository" {
#   # required
#   compartment_id = var.tenancy_ocid
#   display_name   = "yshahi-test"
#   readme {
#         content = "yash's private image repository"
#         format = "text/plain"
#     }

#   # optional
#   is_public    = false
# }

resource "oci_core_vcn" "default_vcn" {
    compartment_id = var.tenancy_ocid
    cidr_blocks    = ["10.0.0.0/16"]
    display_name   = "Default VCN"
}

resource "oci_core_subnet" "lb_subnet" {
  compartment_id = var.tenancy_ocid
  cidr_block = "10.0.1.0/24"
  display_name = "LB Subnet"
  vcn_id = oci_core_vcn.default_vcn.id
}

module "oke_cluster" {
  source = "./kubernetes"
  tenancy_ocid = var.tenancy_ocid
  vcn_id = oci_core_vcn.default_vcn.id
}
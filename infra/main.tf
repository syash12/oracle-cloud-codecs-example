provider "oci" {
  auth          = "APIKey"
  tenancy_ocid  = var.tenancy_ocid
  user_ocid     = var.user_ocid
  fingerprint   = var.fingerprint
  private_key   = file(var.private_key_path)
  region        = var.region
}

resource "oci_artifacts_container_repository" "image_repository" {
  # required
  compartment_id = var.tenancy_ocid
  display_name   = "yshahi-test"
  readme {
        content = "yash's private image repository"
        format = "text/plain"
    }

  # optional
  is_public    = false
}


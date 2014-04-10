package com.dt.enterprise.gcf.model.vo;

import java.io.Serializable;

/**
 * Reason why if was not shipped (shorted).
 *
 */
public class ReasonModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private String splrShrtRsnCd;
	private String splrShrtRsnAbb;
	private String splrShrtRsnDes;

	public String getSplrShrtRsnCd() {
		return this.splrShrtRsnCd;
	}
	public void setSplrShrtRsnCd(String splrShrtRsnCd) {
		this.splrShrtRsnCd = splrShrtRsnCd;
	}
	public String getSplrShrtRsnAbb() {
		return this.splrShrtRsnAbb;
	}
	public void setSplrShrtRsnAbb(String splrShrtRsnAbb) {
		this.splrShrtRsnAbb = splrShrtRsnAbb;
	}
	public String getSplrShrtRsnDes() {
		return this.splrShrtRsnDes;
	}
	public void setSplrShrtRsnDes(String splrShrtRsnDes) {
		this.splrShrtRsnDes = splrShrtRsnDes;
	}
}

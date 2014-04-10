package com.dt.enterprise.gcf.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.dt.enterprise.gcf.model.vo.ReasonModel;
import com.dt.enterprise.gcf.service.OrderService;
import com.dt.enterprise.gcf.utils.GCFException;


/**
 * Controller for the Home screen.
 */
@Controller
public class HomeController {
	
	private static final Logger LOG = Logger
			.getLogger(HomeController.class);
	
	@Autowired
	private OrderService orderService;
	
	//PATH
	private static final String ROOT_PATH = "/";
	private static final String HOME_PATH = "/home";
	//TILE
	private static final String HOME_TILE = "home.index.tile";
	private static final String LIST_REASON_MODEL = "lstReason";
	
	/**
     * Handles any home page case.
     *
     * @param model Attributes set to jsp
     * @return the tile for the home page
     */
	@RequestMapping(value={ROOT_PATH,HOME_PATH},method = RequestMethod.GET)
	public String index(ModelMap model) {
//		try {
//			model.addAttribute(LIST_REASON_MODEL, getListReason());
//		} catch (GCFException e) {
//			LOG.error(e.getMessage(), e);
//		}
		return HOME_TILE;
	}
	
	/**
	 * Get list reason.
	 * @return List<ReasonModel>
	 * @throws GCFException
	 * :GCFException
	 */
	private List<ReasonModel> getListReason() throws GCFException{
		return this.orderService.getListReason();
	}

}
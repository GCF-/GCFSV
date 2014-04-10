package com.dt.jaf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Controller for the Login screen.
 * 
 */
@Controller
@RequestMapping("/login")
public class LoginController {

	private static final String LOGIN_TILE = "login.tile";

	@Autowired
	StandardEnvironment environment;

	/**
	 * Handles any login case.
	 * 
	 * @param logout
	 *            whether the user has just logged out
	 * @param fail
	 *            whether the user has failed a login attempt
	 * @param model
	 *            Spring's model to which to add the logout and failure flags
	 * @return the tile for the login page
	 */
	@RequestMapping(method = RequestMethod.GET)
	public String showLogin(@RequestParam(required = false) boolean logout,
			@RequestParam(required = false) boolean error, ModelMap model) {
		String[] profs = environment.getActiveProfiles();
		if (profs.length > 0)
			model.addAttribute("env", profs[0]);
		model.addAttribute("error", error);
		return LOGIN_TILE;
	}

}
